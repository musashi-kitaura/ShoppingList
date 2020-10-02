class ShoppingsController < ApplicationController
	def index
		@shoppings = Shopping.all
		@shopping = Shopping.new
	end	

	def create
		@shopping = Shopping.create(shopping_params)
		respond_to do |format|
			format.html { redirect_to root_path }
			format.json  
		end
	end	
	
	def destroy
		shopping = Shopping.find(params[:id])
		shopping.destroy
		respond_to do |format|
			format.html { redirect_to root_path }
			format.json  
		end
	end	
		
	private 
	def shopping_params
		params.require(:shopping).permit(:name, :note)
	end	
end