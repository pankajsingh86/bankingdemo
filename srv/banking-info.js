
const cds = require('@sap/cds')

const {Banks, Customers, Accounts, Transactions}  = cds.entities

	module.exports = function(srv) {
        srv.before('CREATE', 'Transactions', async (req) =>{   
        const tx= cds.transaction(req), data = req.data;
        console.log(req.user)
        return tx.run(()=> { 
        if(data.hasOwnProperty("type")) {
            if(data.type === 'Deposit') {
                UPDATE(Accounts).set('balance +=', data.amount).where('accountid =', data.accounts_accountid)
            } else {
                UPDATE(Accounts).set('balance -=', data.amount).where('accountid =', data.accounts_accountid).and(
                    'balance >=', data.amount)               
            }
            }
        }).then((affectedrows) => {
        if(affectedrows < 5000) {
            req.error(409, `insufficient balance in the #${data.accounts_accountid}`)
        }
        })
        })    

    srv.after('READ',  'Accounts', each=> {	
    if (each.balance > 50000) {each.message += '-----Privileged Customer';}	
    })	
}


    
 