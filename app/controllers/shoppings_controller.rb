class ShoppingsController < ApplicationController
	def index
		@shoppings = Shopping.all
		@shopping = Shopping.new
	end	

	def create
		Shopping.create(shopping_params)
	end	

	private 
	def shopping_params
		params.require(:shopping).permit(:name, :note)
	end	
end