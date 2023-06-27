const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router();

router.post('/auth/orderData', async (req, res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});
    let eId = await Orders.findOneAndUpdate({email : req.body.email});
    if (eId===null) {
        try {
            await Orders.create({
                email : req.body.email,
                order_data : [data]
            }).then(()=>{
                res.json({success : true});
            })
        } catch (error) {
            console.log(error.message);
        }
    }else{
        try {
            await Orders.findOneAndUpdate({email : req.body.email},
            {$push : {order_data:[data]}}).then(()=>{
                res.json({success : true});
            })
        } catch (err) {
            console.log(error.message);
        }
    }
})

// router.post("/auth/myOrderData",async (req,res)=>{
//     try {
//         let myData = await Orders.findOne({email: req.body.email});
//         res.json(myData.order_data);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

router.post("/auth/myOrderData",async (req,res)=>{
    try {
        let myData = await Orders.findOne({email: req.body.email});
        res.json({orderData : myData});
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;


[
	[
		{
			"Order_date": "Sun Jun 25 2023"
		},
		{
			"id": "6492953cc2356f603b4934c8",
			"name": "Chilli Paneer",
			"qty": 2,
			"size": "half",
			"price": 240
		}
	],
	[
		[
			{
				"Order_date": "Sun Jun 25 2023"
			},
			{
				"id": "6492953cc2356f603b4934c8",
				"name": "Chilli Paneer",
				"qty": 1,
				"size": "half",
				"price": 120
			}
		]
	]
]