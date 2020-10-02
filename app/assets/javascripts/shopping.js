$(function(){
//JavaScriptのdocumentにあたるのが、$（ドルマーク）です。$のあとにセレクタと呼ばれるHTMLの指定方法を記述することで、HTML要素が取得できます。	
	function buildHTML(shopping){
		let html =
			`<div class="product-list" {"data-shopping-id": ${shopping.id}, "data-user-name": ${shopping.name} >
				<div class="product-name">
					${shopping.name}
				</div>
				<div class="note">
					${shopping.note}
				</div>
				<div class="date-addend">
					${shopping.created_at}
				</div>
				<form action= "/shoppings/${shopping.id}" method="post" "shopping_path" class="delete" >
					<input type="hidden"  name="_method" value="delete" >
					<input type="submit" name="commit" value="削除" class="delete-button" data-disable-with="削除">
				</form>
			</div>`
		
			//<form acttion= "${shopping.id}" accept-charset="UTF-8" method="post">
						//<input type="submit" name="commit" value="削除" class="delete-button" data-disable-with="削除">
					//</form>
		return html;		
	}
	//フォームが送信されたら、イベントが発火するようにする
	$('.form').on('submit', function(e){
		//form要素のクラス属性が'.form'となっている。
		//フォームの送信についてonメソッドでイベントをセッティングする際は、form要素自体に設定する.
		e.preventDefault()
		//preventDefault()を使用してデフォルトのイベントを止める。
		let formData = new FormData(this);
		//new FormData(フォーム要素)とすることでFormDataを作成できる。
		let url = $(this).attr('action');
		//ここで、urlを定義する。
		//attrメソッドで要素が持つ指定属性の値を返す。actionを指定しており、属性の値を取得している。action属性にはフォームの送信先のurlの値が入っている。
		//これでリクエスト先のURLを定義。
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false,
		})
		.done(function(data){
			let html = buildHTML(data);
			$('.main-list').append(html)
			$('.form')[0].reset();      
			$('.main-list').animate({ scrollTop: $('.main-list')[0].scrollHeight});
			$('.product-button').prop('disabled', false);
		})
		.fail(function(){
		alert('error');
		});	
	});	
});

$(function(){
	// 関数
	$('.product-list').on('submit',function(e){
		// 発火させる
		e.preventDefault();
		// デフォルトを止めて
		let id = $(this).attr('data-shopping-id')
		$(this).remove();
		$.ajax({
			url: "/shoppings/"+id,
			type: "POST",
			data:{'id': id,
			'_method': 'DELETE'},	
		});	
		
	});
});
