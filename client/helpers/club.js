Template.club.rendered = function(){
	//Map.initialize();
	Map.autocomplete("endereco");
};

Template.club.helpers({
  name: "Ben Bitdiddle"
});

Template.club.events({
	'submit': function(e,template){
		e.preventDefault();
		var nome = template.find("#nome").value;
		Map.codeAddress("endereco",function(endereco){
			var address =  endereco.formatted_address;
			var lat = endereco.geometry.location.lat();
			var lng = endereco.geometry.location.lng();
			Club.insert({nome:nome,endereco:address,loc: [lat,lng]});
		});
		
	}
});