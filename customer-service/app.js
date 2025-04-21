const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());


let customerArray=[
    {
        name: "Amna",
        id:1,
        preference: [
            "pizza",
        ]
    },
    {
        name: "Asma",
        id:2,
        preference: [
            "burger",
        ]
    },
];

app.get('/customer', (req, res) => {
console.log("Displaying list of customer\n");
res.send(customerArray);
});

app.post('/customer/register', (req, res) => {
    let cusName=req.body.name;
    let cuspref=req.body.preference;
    let size=customerArray.length+1;

    let newres={
       name :  cusName,
       preference : cuspref,
       id: size
    }

    customerArray.push(newres);

    console.log("Displaying list of restaurants\n");
    res.send(customerArray);
});
    
app.put('/customer/update', (req, res) => {
    let cusName=req.body.name;
    let cuspref=req.body.preference;

    let findres=customerArray.find(res => res.name.toLocaleLowerCase() === cusName.toLocaleLowerCase());

    findres.preference=cuspref;

    if(!findres){
        return res.status(404).json({message: "Customer not found!"});
    }
    if(findres){
        res.json(findres);
    }else{
        return res.status(404).json({message: "Customer not found!"});
    }
    res.send(customerArray);   
});



app.listen(port, () => {
console.log(`Customer Microservice listening on port ${port}`);
});