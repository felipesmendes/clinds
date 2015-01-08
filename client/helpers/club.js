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
		var dias = template.findAll("input[name='dias']:checked");
		var arrayDias = [];
		_.each(dias,function(input){
			arrayDias.push(input.value);
		});
		var horario_de = template.find("#horario_de").value;
		var horario_ate = template.find("#horario_ate").value;
		var descricao = template.find("#descricao").value;
		Map.codeAddress("endereco",function(endereco){
			var address =  endereco.formatted_address;
			var lat = endereco.geometry.location.lat();
			var lng = endereco.geometry.location.lng();
			Club.insert({nome:nome,endereco:address,loc: [lat,lng],dias:arrayDias,abertura:horario_de,fechamento:horario_ate,descricao:descricao});
		});
		
	}
});