$(document).ready(function(){
	$("#searchUser").on('keyup', function(e){
		let term = $("#searchUser").val();
		let API_URL = `https://api.github.com/users/${term}`;
		/*console.log(API_URL);*/

		$.ajax({
			type: "GET",
			url: API_URL,
			dataType: "json",
			data: {
				client_id: '23eb18e8abb5bb8b270e',
				client_secret:'e9b2ed6a19af6fc0d296beb8192db783fed646ad'
			},
		}).done(function(user){
			$.ajax({
				type: "GET",
				url: `${API_URL}/repos`,
				data: {
				client_id: '23eb18e8abb5bb8b270e',
				client_secret:'e9b2ed6a19af6fc0d296beb8192db783fed646ad',
				sort: "created: asc",
				per_page: 5
				}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$("#repos").append(`
						<div class="well">
							<div class="row">
								<div class="col-md-5">
									<strong>${repo.name}</strong>
								</div>
								<div class="col-md-5">
									<span class="label label-default">Forks: ${repo.fork_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${user.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
								</div>
							</div>
						</div>
					`)
				});
			});

			$("#profile").html(`
				<div class="panel panel-default">
	  				<div class="panel-heading">
	   				 <h3 class="panel-title">${user.name}</h3>
	  				</div>
	  				<div class="panel-body">
	   					<div class="row">
	   						<div class="col-md-3">
	   							<img src="${user.avatar_url}" class="thumbnail">
	   							<a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
	   						</div>
	   						<div class="col-md-9">
	   							<span class="label label-default">Public Repos: ${user.public_repos}</span>
								<span class="label label-primary">Public Gists: ${user.public_gists}</span>
								<span class="label label-success">Followers: ${user.followers}</span>
								<span class="label label-info">Following: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}></li>
									<li class="list-group-item">Website/Blog: ${user.blog}></li>
									<li class="list-group-item">Location: ${user.location}></li>
									<li class="list-group-item">Member Since: ${user.created_at}></li>
								</ul>
	   						</div>
	   					</div>
	  				</div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos">
				</div>
			`);
		});
	});
});