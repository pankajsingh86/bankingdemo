const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {

    const service = await cds.connect.to('NorthWind');
	const { Products } = this.entities;	
	this.on('READ', Products, request => {
		return service.tx(request).run(request.query);
	});
});