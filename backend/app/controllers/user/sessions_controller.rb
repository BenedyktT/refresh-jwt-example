# frozen_string_literal: true

class User::SessionsController < Devise::SessionsController
  include RackSessionsFix

  def respond_with(resource, _opts = {})
    if request.method == "POST"
      response.set_cookie("refresh_token", RefreshTokenGenerator.new(resource).cookie)

      render json: {message: "Logged in successfully", user: resource}, status: :ok
    else
      render json: {
        messages: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def refresh_token
    refresh_token = request.cookies["refresh_token"]

    return render json: {message: "Token is required"}, status: :unauthorized if refresh_token.nil?

    begin
      payload = JWT.decode(refresh_token, Rails.application.credentials.devise_jwt_secret_key, true)[0]

      current_user = User.find_by(id: payload["sub"], jti: payload["jti"])

      return render json: {message: "Token is invalid"}, status: :unauthorized if current_user.nil?

      current_user.update(jti: SecureRandom.uuid)
      new_token = Warden::JWTAuth::UserEncoder.new.call(current_user, :user, nil).first

      response.set_cookie("refresh_token", RefreshTokenGenerator.new(current_user).cookie)
      response.set_header("Authorization", "Bearer #{new_token}")
      render json: {message: "Token refreshed"}, status: :ok
    rescue JWT::VerificationError
      render json: {message: "Token is invalid"}, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    response.delete_cookie("refresh_token")
    head :no_content
  end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
