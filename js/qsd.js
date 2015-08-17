(function(){
	var postsMod = angular.module("postsMod",[]);
	var postMod = angular.module("postMod",[]);
	var buysMod = angular.module("buysMod",[]);
	var testsMod = angular.module("testsMod",[]);
	var newsMod = angular.module("newsMod",[]);
	postsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	buysMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	newsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	testsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	postMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");

	});
	
	testsMod.controller("testsCtrl",['$http', '$scope', '$filter',function($http, $scope, $filter){
	  
	  
	  
	  $scope.hotPosts = [];


	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var readNum = 50;                              //读取的页数
	var showNum = 10;                               //展现的页数
	$scope.loading = 0;						//判断是否正在读取内容的变量
	
	$scope.tags = [];


	  $scope.getTags = function() {
	  	var Tag = AV.Object.extend("ShowTags");
	  	var query = new AV.Query(Tag);
	  	query.ascending ("createdAt");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.tags = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  $scope.getTags();
	$scope.searchFilter = function(e){
		if (!$scope.search)
			return true;

		var isHit = false;
		var targetStr = (e.title + e.tag + e.mall).toLowerCase();
		var sStr = $scope.search.toLowerCase();
		//空格查询
		if (sStr.indexOf(" ")) {
			var ss= new Array(); //定义一数组 
			ss=sStr.split(" "); //字符分割
			for (i=0;i<ss.length ;i++ ) {
					if (targetStr.indexOf(ss[i]) >= 0) {
						isHit = true;
					} else {
						isHit = false;
						break;
					}
			}
		} else {
			if (targetStr.indexOf(sStr) >= 0)
				isHit = true;
		}
		return isHit;
	}
	$scope.tagClick = function(tag) {
		$scope.search = tag;
		var i = $scope.posts.length;
		for (;i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);
		}
		if (readNum < 1000) {
			showNum=readNum*4;
			readNum=readNum*20;
		}
		fillContent();
	}
	$scope.posts = [];
	$scope.readPosts = [];

	$scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "test");
	  	query.limit(readNum);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.readPosts = JSON.parse(JSON.stringify(results));
					for (var i = 0; i < showNum && i < $scope.readPosts.length; i++) {
						$scope.posts.push($scope.readPosts[i]);                     
					}
					$scope.hotPosts = $filter('orderBy')($scope.readPosts,'-click'); 
				})
	  		}
	  	})
	}
	function fillContent() {                    //核心是这个函数，向$scope.posts
	if ($scope.readPosts.length == 0 || $scope.posts.length == 0)
		return;	
	if ($scope.posts.length < $scope.readPosts.length) {
		$scope.$apply(function(){
		var oldlen = $scope.posts.length;
		var i = $scope.posts.length
		for (; i < oldlen + showNum && i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);                     
		}
		})
	} else {
		//请求内容          
		var Post = AV.Object.extend("Post");
		var query = new AV.Query(Post);
		query.equalTo("doc_type", "test");
		query.descending("time");
		query.skip($scope.readPosts.length);
		query.limit(readNum);
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
							}
							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}
						
				},
				error: function(error) {
				}
			})
		}
	}
	

	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		fillContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    //$scope.gethotPosts();
}]);
	
	postsMod.controller("postsCtrl",['$http', '$scope', '$filter',function($http, $scope, $filter){
	  $scope.hotPosts = [];

	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var readNum = 50;                              //读取的页数
	var showNum = 10;                               //展现的页数
	$scope.loading = 0;						//判断是否正在读取内容的变量
	
	$scope.tags = [];


	  $scope.getTags = function() {
	  	var Tag = AV.Object.extend("ShowTags");
	  	var query = new AV.Query(Tag);
	  	query.ascending ("createdAt");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.tags = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  $scope.getTags();
	$scope.searchFilter = function(e){
		if (!$scope.search)
			return true;

		var isHit = false;
		var targetStr = (e.title + e.tag + e.mall).toLowerCase();
		var sStr = $scope.search.toLowerCase();
		//空格查询
		if (sStr.indexOf(" ")) {
			var ss= new Array(); //定义一数组 
			ss=sStr.split(" "); //字符分割
			for (i=0;i<ss.length ;i++ ) {
					if (targetStr.indexOf(ss[i]) >= 0) {
						isHit = true;
					} else {
						isHit = false;
						break;
					}
			}
		} else {
			if (targetStr.indexOf(sStr) >= 0)
				isHit = true;
		}
		return isHit;
	}
	$scope.tagClick = function(tag) {
		$scope.search = tag;
		var i = $scope.posts.length;
		for (;i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);
		}
		if (readNum < 1000) {
			showNum=readNum*4;
			readNum=readNum*20;
		}
		fillContent();
	}
	$scope.posts = [];
	$scope.readPosts = [];

	$scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.notEqualTo("doc_type", "test");
	  	query.limit(readNum);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.readPosts = JSON.parse(JSON.stringify(results));
					for (var i = 0; i < showNum && i < $scope.readPosts.length; i++) {
						$scope.posts.push($scope.readPosts[i]);                     
					}
					$scope.hotPosts = $filter('orderBy')($scope.readPosts,'-click'); 
				})
	  		}
	  	})
	}
	function fillContent() {                    //核心是这个函数，向$scope.posts
	if ($scope.readPosts.length == 0 || $scope.posts.length == 0)
		return;	
	if ($scope.posts.length < $scope.readPosts.length) {
		$scope.$apply(function(){
		var oldlen = $scope.posts.length;
		var i = $scope.posts.length
		for (; i < oldlen + showNum && i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);                     
		}
		})
	} else {
		//请求内容          
		var Post = AV.Object.extend("Post");
		var query = new AV.Query(Post);
		query.notEqualTo("doc_type", "test");
		query.descending("time");
		query.skip($scope.readPosts.length);
		query.limit(readNum);
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
							}
							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}
						
				},
				error: function(error) {
				}
			})
		}
	}
	

	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		fillContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    //$scope.gethotPosts();
}]);
	
	buysMod.controller("buysCtrl",['$http', '$scope', '$filter',function($http, $scope, $filter){


	  $scope.hotPosts = [];


	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var readNum = 50;                              //读取的页数
	var showNum = 10;                               //展现的页数
	$scope.loading = 0;						//判断是否正在读取内容的变量
	
	$scope.tags = [];


	  $scope.getTags = function() {
	  	var Tag = AV.Object.extend("ShowTags");
	  	var query = new AV.Query(Tag);
	  	query.ascending ("createdAt");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.tags = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  $scope.getTags();
	$scope.searchFilter = function(e){
		if (!$scope.search)
			return true;

		var isHit = false;
		var targetStr = (e.title + e.tag + e.mall).toLowerCase();
		var sStr = $scope.search.toLowerCase();
		//空格查询
		if (sStr.indexOf(" ")) {
			var ss= new Array(); //定义一数组 
			ss=sStr.split(" "); //字符分割
			for (i=0;i<ss.length ;i++ ) {
					if (targetStr.indexOf(ss[i]) >= 0) {
						isHit = true;
					} else {
						isHit = false;
						break;
					}
			}
		} else {
			if (targetStr.indexOf(sStr) >= 0)
				isHit = true;
		}
		return isHit;
	}
	$scope.tagClick = function(tag) {
		$scope.search = tag;
		var i = $scope.posts.length;
		for (;i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);
		}
		if (readNum < 1000) {
			showNum=readNum*4;
			readNum=readNum*20;
		}
		fillContent();
	}
	$scope.posts = [];
	$scope.readPosts = [];

	$scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
			query.equalTo("doc_type", "buy");
	  	query.limit(readNum);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.readPosts = JSON.parse(JSON.stringify(results));
					for (var i = 0; i < showNum && i < $scope.readPosts.length; i++) {
						$scope.posts.push($scope.readPosts[i]);                     
					}

    			$scope.hotPosts = $filter('orderBy')($scope.readPosts,'-click'); 
				})
	  		}
	  	})
	}
	function fillContent() {                    //核心是这个函数，向$scope.posts
	if ($scope.readPosts.length == 0 || $scope.posts.length == 0)
		return;	
	if ($scope.posts.length < $scope.readPosts.length) {
		$scope.$apply(function(){
		var oldlen = $scope.posts.length;
		var i = $scope.posts.length
		for (; i < oldlen + showNum && i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);                     
		}
		})
	} else {
		//请求内容          
		var Post = AV.Object.extend("Post");
		var query = new AV.Query(Post);
		query.equalTo("doc_type", "buy");
		query.descending("time");
		query.skip($scope.readPosts.length);
		query.limit(readNum);
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
							}
							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}
						
				},
				error: function(error) {
				}
			})
		}
	}
	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		fillContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    //$scope.gethotPosts();
}]);
	
	newsMod.controller("newsCtrl",['$http', '$scope', '$filter',function($http, $scope, $filter){

	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	var readNum = 50;                              //读取的页数
	var showNum = 10;                               //展现的页数
	$scope.loading = 0;						//判断是否正在读取内容的变量
	
	$scope.tags = [];


	  $scope.getTags = function() {
	  	var Tag = AV.Object.extend("ShowTags");
	  	var query = new AV.Query(Tag);
	  	query.ascending ("createdAt");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.tags = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  $scope.getTags();
	$scope.searchFilter = function(e){
		if (!$scope.search)
			return true;

		var isHit = false;
		var targetStr = (e.title + e.tag + e.mall).toLowerCase();
		var sStr = $scope.search.toLowerCase();
		//空格查询
		if (sStr.indexOf(" ")) {
			var ss= new Array(); //定义一数组 
			ss=sStr.split(" "); //字符分割
			for (i=0;i<ss.length ;i++ ) {
					if (targetStr.indexOf(ss[i]) >= 0) {
						isHit = true;
					} else {
						isHit = false;
						break;
					}
			}
		} else {
			if (targetStr.indexOf(sStr) >= 0)
				isHit = true;
		}
		return isHit;
	}
	$scope.tagClick = function(tag) {
		$scope.search = tag;
		var i = $scope.posts.length;
		for (;i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);
		}
		if (readNum < 1000) {
			showNum=readNum*4;
			readNum=readNum*20;
		}
		fillContent();
	}
	$scope.posts = [];
	$scope.readPosts = [];

	$scope.getPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		query.equalTo("doc_type", "news");
	  	query.limit(readNum);
	  	query.descending("time");
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.readPosts = JSON.parse(JSON.stringify(results));
					for (var i = 0; i < showNum && i < $scope.readPosts.length; i++) {
						$scope.posts.push($scope.readPosts[i]);                     
					}
					$scope.hotPosts = $filter('orderBy')($scope.readPosts,'-click'); 
				})
	  		}
	  	})
	}
	function fillContent() {                    //核心是这个函数，向$scope.posts
	if ($scope.readPosts.length == 0 || $scope.posts.length == 0)
		return;	
	if ($scope.posts.length < $scope.readPosts.length) {
		$scope.$apply(function(){
		var oldlen = $scope.posts.length;
		var i = $scope.posts.length
		for (; i < oldlen + showNum && i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);                     
		}
		})
	} else {
		//请求内容          
		var Post = AV.Object.extend("Post");
		var query = new AV.Query(Post);
		query.equalTo("doc_type", "news");
		query.descending("time");
		query.skip($scope.readPosts.length);
		query.limit(readNum);
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
							}
							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}
						
				},
				error: function(error) {
				}
			})
		}
	}
	

	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		fillContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    $scope.getPosts();
    //$scope.gethotPosts();
}]);
	postMod.filter('trustHtml', function ($sce) {

        return function (input) {

            return $sce.trustAsHtml(input);

        }

    });
	
	postMod.directive("comment", function() {
		return {
			restrict: 'A',
			link: function(scope){
				// get the variable from controller
				var article_id = scope.id;
				
				var data_thread_key = 'article_' + article_id;
				var data_url = 'http://qiongsandai.com/post.html?id=' + article_id;
				var data_title = article_id;
				// dynamic load the duoshuo comment box
				var el = document.createElement('div');//该div不需要设置class="ds-thread"
				el.setAttribute('data-thread-key', data_thread_key);//必选参数
				el.setAttribute('data-url', data_url);//必选参数
				el.setAttribute('data-title', data_title);//可选参数
				DUOSHUO.EmbedThread(el);
				jQuery('#comment-box').append(el);
			}
		};
	});
	
	postMod.config(['$locationProvider', function($locationProvider) {  
		$locationProvider.html5Mode(true);  
	}]); 
	postMod.controller("postCtrl",['$http', '$scope', '$location', function($http, $scope, $location){

	  $scope.getPost = function(objectId) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	query.get(objectId, {
    			success: function(post) {
				// 成功，回调中可以取得这个 Post 对象的一个实例
				$scope.$apply(function(){
	  				$scope.post = JSON.parse(JSON.stringify(post));
	  			})
    			},
    			error: function(object, error) {
    			}
	  	});
	  }

	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	  
	  $scope.hotPosts = [];

	  $scope.gethotPosts = function() {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	var now = new Date();
			var date = new Date(((now.getTime() - 3 * 24 * 3600 * 1000)/(24*3600*1000)) *24*3600*1000);
	  	query.greaterThan("time", date);
	  	query.descending("click");
	  	query.limit(6);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.hotPosts = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  }
	  

	  
	if ($location.search().id) {  
		$scope.id = $location.search().id;  
	}
	/*
	s=window.location.search.substr(1);
	params=s.split('&');
	var paramMap = new Map();
	for (i in params){
		param=params[i].split('=');
		paramMap.set(param[0],param[1]);
	}
	if (paramMap.get('id')==null || paramMap.get('id').length == 0)
		window.location.href='err.html';
		
	*/
	if ($scope.id==null || $scope.id.length == 0)
		window.location.href='err.html';
	$scope.getPost($scope.id);
	$scope.gethotPosts();
	}
	]);
})();






(function(){
	var libsMod = angular.module("libsMod",[]);
	libsMod.run(function() {
	    AV.initialize("1ootsw3y4smje21veqtkn2w6xtk1al2hdn6xs05vvzp0ed4k", "p0ir4kljnq05g4jm7udb7u2lrk45cy1c5hawkufgtkcck00p");
	});
	libsMod.controller("libsCtrl",['$http', '$scope', '$filter',function($http, $scope, $filter){


	$scope.posts = [];
	$scope.readPosts = [];

	  $scope.gswap = {};
	  $scope.bswap = {};
	  $scope.cswap = {};
	  $scope.updatePostGood = function(postParam) {
		if (!$scope.gswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
		
		
	  	// 可以先查询出要修改的那条存储
			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('good');
				post.save();
				$scope.$apply(function(){
					postParam.good=postParam.good+1
					$scope.gswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostBad = function(postParam) {
		if (!$scope.bswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
				post.increment('bad');
				post.save();
				$scope.$apply(function(){
					postParam.bad=postParam.bad+1;
					$scope.bswap[postParam.objectId] = true;
	  			})
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }

	  $scope.updatePostClick = function(postParam) {
		if (!$scope.cswap[postParam.objectId]) {
	  	var Post = AV.Object.extend("Post");
	  	var query = new AV.Query(Post);
	  	// 可以先查询出要修改的那条存储

			// 这个 id 是要修改条目的 objectId，你在生成这个实例并成功保存时可以获取到，请看前面的文档
			query.get(postParam.objectId, {
    			success: function(post) {
      		// 成功，回调中可以取得这个 Post 对象的一个实例，然后就可以修改它了
      		post.increment('click');
      		post.save();
			
			$scope.cswap[postParam.objectId] = true;
    			},
    			error: function(object, error) {
      		// 失败了.
      		console.log(object);
    			}
	  	});
		}
	  }
	var readNum = 50;                              //读取的页数
	var showNum = 10;                               //展现的页数
	$scope.loading = 0;						//判断是否正在读取内容的变量
	
	$scope.alltypes = [];
	$scope.top_types = [];
	$scope.types = [];
	$scope.brands = [];

	$scope.searchFilter = function(e){

	}

	  $scope.getLibTypes = function() {
	  	var Tag = AV.Object.extend("LibTypes");
	  	var query = new AV.Query(Tag);
	  	query.descending("num");
	  	query.limit(1000);
	  	var top_typeMap = {};
	  	var typeMap = {};
	  	var brandMap = {};
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.alltypes = JSON.parse(JSON.stringify(results));
	  				for (var i=0;i<results.length ;i++ ) {
	  					if (top_typeMap[$scope.alltypes[i].top_type]!=1) {
								top_typeMap[$scope.alltypes[i].top_type] = 1;
								$scope.top_types.push($scope.alltypes[i].top_type);
	  					}
	  					if (typeMap[$scope.alltypes[i].type]!=1) {
								typeMap[$scope.alltypes[i].type] = 1;
								$scope.types.push($scope.alltypes[i].type);
	  					}
	  					if (brandMap[$scope.alltypes[i].brand]!=1) {
								brandMap[$scope.alltypes[i].brand] = 1;
								$scope.brands.push($scope.alltypes[i].brand);
	  					}
	  				}
	  			})
	  		}
	  	})
	  }
	$scope.getLibTypes();

	var osearch="";
	var obrand="";
	var otype="";
	var otop_type="";

	$scope.topFilter = function(x) {
		var isHit = false;
		var filterType = $filter('filter')($scope.alltypes,{top_type : $scope.top_type, type : $scope.type, brand : $scope.brand});
		for (i=0;i<filterType.length ;i++ ) {
					if (x==filterType[i].top_type) {
						isHit = true;
						break;
					} else {
						isHit = false;
					}
		}
		return isHit;
	}
	$scope.typeFilter = function(x) {
		var isHit = false;
		var filterType = $filter('filter')($scope.alltypes,{top_type : $scope.top_type, type : $scope.type, brand : $scope.brand});
		for (i=0;i<filterType.length ;i++ ) {
					if (x==filterType[i].type) {
						isHit = true;
						break;
					} else {
						isHit = false;
					}
		}
		return isHit;
	}
	$scope.brandFilter = function(x) {
		var isHit = false;
		var filterType = $filter('filter')($scope.alltypes,{top_type : $scope.top_type, type : $scope.type, brand : $scope.brand});
		for (i=0;i<filterType.length ;i++ ) {
					if (x==filterType[i].brand) {
						isHit = true;
						break;
					} else {
						isHit = false;
					}
		}
		return isHit;
	}

	$scope.topClick= function(txt) {
		$scope.top_type = txt;
	}
	$scope.typeClick = function(txt) {
		$scope.type = txt;
	}
	$scope.brandClick = function(txt) {
		$scope.brand = txt;
	}

	$scope.searchClick = function() {
		if ($scope.search == osearch && $scope.brand == obrand && $scope.type == otype && $scope.top_type == otop_type) {
				return;
		}
		// 保留上次搜索参数
		osearch = $scope.search; 
		obrand = $scope.brand;
		otype = $scope.type;
		otop_type = $scope.top_type;

		//清空当前结果
		$scope.readPosts=[];
		$scope.posts=[];
		//请求内容
		var Post = AV.Object.extend("Lib");
		var query = new AV.Query(Post);
		if (obrand)
		query.equalTo("brand", obrand);
		if (otype)
		query.equalTo("type", otype);
		if (otop_type)
		query.equalTo("top_type", otop_type);
		if (osearch)
		query.matches("name", "(?i)"+osearch);
		query.descending("score");
		query.limit(readNum);
		$scope.loading=0;
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));

						$scope.$apply(function(){
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
								if (i < showNum) {
									$scope.posts.push($scope.readPosts[i]); 
								}
							}

							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}

						})
				},
				error: function(error) {
				}
			})
		}
	}

	function fillContent() {                    //核心是这个函数，向$scope.posts
	if ($scope.readPosts.length == 0 || $scope.posts.length == 0)
		return;	
	if ($scope.posts.length < $scope.readPosts.length) {
		$scope.$apply(function(){
		var oldlen = $scope.posts.length;
		var i = $scope.posts.length
		for (; i < oldlen + showNum && i < $scope.readPosts.length; i++) {
			$scope.posts.push($scope.readPosts[i]);                     
		}
		})
	} else {
		//请求内容          
		var Post = AV.Object.extend("Lib");
		var query = new AV.Query(Post);
		if (obrand)
		query.equalTo("brand", obrand);
		if (otype)
		query.equalTo("type", otype);
		if (otop_type)
		query.equalTo("top_type", otop_type);
		if (osearch)

		query.matches("name", "(?i)"+osearch);
		query.descending("score");
		query.skip($scope.readPosts.length);
		query.limit(readNum);
		if ($scope.loading==0) {                     //如果页面正在读取
			$scope.loading = 1;                     //告知正在读取             
			query.find({						//调用API，读取第几页的内容                 
				success:function (results){
						posts = JSON.parse(JSON.stringify(results));
						if (posts.length != 0) {
							for (var i = 0; i <= posts.length - 1; i++) {                         
								$scope.readPosts.push(posts[i]);
							}
							$scope.loading = 0;        //告知读取结束
						} else {
							$scope.loading = 2;        //告知读取完毕
						}
						
				},
				error: function(error) {
				}
			})
		}
	}
	}
	  
	$(window).on('scroll', function (event) {   //jquery，事件滚动监听         
		if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //当滚动到页面底部             
		fillContent();                      //调用向$scope.posts添加内容函数         
	  }
	});
    //$scope.getPosts();
    //$scope.gethotPosts();
}]);
})();


var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?288976a40588d0b72643ed39573e39dd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();