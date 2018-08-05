var User = require('../models').User;
var stripe = require('stripe')('sk_test_0PHtbfBiBeysTSgQiECHmy18');
var TenantPayment = require('../models').TenantPayment;
var PropertyTenant = require('../models').PropertyTenant;
var Property = require('../models').Property;
const config = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	async charge(req, res) {
		const token = req.body.stripeToken;
		const amt = req.body.amount;
		var tenantId = req.body.tenantId;
		await stripe.charges.create({
	amount: amt,
	currency: 'usd',
	source: token,
	description: req.body.description,
}).then(function(charge) {
	console.log('about to log charge');
	console.log(charge);
	console.log('finished logging charge');
	if(charge.paid === true){
            PropertyTenant.find({
                where: {tenantId: req.body.tenantId},
                    })
            .then(propertyTenant => {
				console.log(PropertyTenant);
				console.log('finish find log');
				const propertyId = propertyTenant.propertyId;
				propertyTenant.credits = propertyTenant.credits + (req.body.amount);
				propertyTenant.owe = propertyTenant.rent + propertyTenant.owe - (req.body.amount);
				propertyTenant.update(
					{
						credits : propertyTenant.credits,
						owe : propertyTenant.owe
					}
				)
					return savePaymentRecord(res, charge, tenantId,propertyId,req.body.description, req.body.amount);
			}
		);

	}else{
			return res.status(401).send({message: 'unable to charge'});
	}

  // New charge created on a new customer
}).catch(function(err) {
  console.log(err);
	return res.status(401).send(err);
});
},

list(req, res) {
	return PropertyTenant
		.findAll()
		.then(propertyTenant => res.status(200).send(propertyTenant))
		.catch(error => res.status(400).send(error));
},

retrieve(req, res) {
    return PropertyTenant
    .find({
        where: {tenantId: req.body.tenantId},
            })
        .then(propertyTenant => {
            if (!propertyTenant) {
                return res.status(404).send({
                    message: 'tenant Not Found',
                });
            }
            return res.status(200).send(propertyTenant);
        })
        .catch(error => res.status(400).send(error));
}

};

	function savePaymentRecord(res, charge, tenantId, propertyId, description, amount) {
			var data = null;
		Property.findById(propertyId)
		.then(property => {
			//compare owner of prop to the current user
			// if(property.userId == currentUser) {
		  data = {
			tenantId: tenantId,
			propertyId: propertyId,
			property_name: property.property_name,
			isPaid: true,
			description: description,
			amount: amount
		}
		TenantPayment.create(data);
		console.log("why you does not show");
		console.log(data);
		return res.status(200).send({tenantPayment: data});;
		// }
		// else {
		//  return res.status(401).send({message: 'Unable to authorize.'});
	 // }
 }
)

}
