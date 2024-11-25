class PingController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: {
      status: "Authenticated",
      user: current_user
    }
  end
end
