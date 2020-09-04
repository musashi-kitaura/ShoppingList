class ShoppingsController < ApplicationController
	def index
		@shoppings = Shopping.all
		@shopping = Shopping.new
	end	

	def create
		Shopping.create(shopping_params)
		redirect_to root_path
	end	

	def destroy
		shopping = Shopping.find(params[:id])
		shopping.destroy
		redirect_to root_path
	end	
		
	private 
	def shopping_params
		params.require(:shopping).permit(:name, :note)
	end	
end