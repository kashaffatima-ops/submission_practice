const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


let orderArray=[
    {
        customername: "Amna",
        restaurantname: "Cheezious",
        id:1,
        orderlist:[
            "pizza",
            "burger"
        ],
        total:2000,
        status:"in process"
    },
    {
        customername: "Asma",
        restaurantname: "Cheezious",
        id:2,
        orderlist:[
            "pizza"
        ],
        total:1000,
        status: "delivered"
    },
];

app.get('/orders', (req, res) => {
console.log("Displaying list of restaurants\n");
res.send(orderArray);
});

app.get('/order/status/:id', (req, res) => {
    let reqname = req.params.id;
    let findres=orderArray.find(res => res.id == reqname);

    let statusonj={
        status: findres.status
    }
    if(!findres){
        return res.status(404).json({message: "Customer not found!"});
    }
    if(findres){
        res.json(statusonj);
    }else{
        return res.status(404).json({message: "Customer not found!"});
    }
    res.send(orderArray);   
});

app.get('/order/history/:name', (req, res) => {
    let reqname = req.params.name;

    let findres=orderArray.filter((res) => res.customername.toLowerCase() === reqname.toLowerCase());
    console.log(findres);
    if(!findres){
        return res.status(404).json({message: "Restaurant not 1 found!"});
    }
    if(findres){
        res.json(findres);
    }else{
        return res.status(404).json({message: "Restaurant not 2 found!"});
    }
    res.send(orderArray);   
});



app.listen(port, () => {
console.log(`Order Microservice listening on port ${port}`);
});