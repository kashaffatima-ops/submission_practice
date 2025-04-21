const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
app.use(express.json());


let restaurantArray=[
    {
        name: "Ranchers",
        address: "F11",
        id:1,
        available:'no',
    },
    {
        name: "Cheezious",
        address: "F11",
        id:2,
        available:'yes'
    },
];

app.get('/restaurant', (req, res) => {
console.log("Displaying list of restaurants\n");
res.send(restaurantArray);
});

app.post('/restaurant/add', (req, res) => {
    let resName=req.body.name;
    let resAddress=req.body.address;
    let resavailable=req.body.available;
    let size=restaurantArray.length+1;

    let newres={
        name: resName,
        address: resAddress,
        id: size,
        available: resavailable
    }

    restaurantArray.push(newres);

    console.log("Displaying list of restaurants\n");
    res.send(restaurantArray);
});
    
app.get('/restaurant/find/:name', (req, res) => {
    let reqname = req.params.name;
    let findres=restaurantArray.find(res => res.name.toLocaleLowerCase() === reqname.toLocaleLowerCase());
    if(!findres){
        return res.status(404).json({message: "Restaurant not found!"});
    }
    if(findres){
        res.json(findres);
    }else{
        return res.status(404).json({message: "Restaurant not found!"});
    }
    res.send(restaurantArray);   
});

app.get('/restaurant/available', (req, res) => {
    
    let findres=restaurantArray.filter((res) => res.available === "yes");
    console.log(findres);
    if(!findres){
        return res.status(404).json({message: "Restaurant not 1 found!"});
    }
    if(findres){
        res.json(findres);
    }else{
        return res.status(404).json({message: "Restaurant not 2 found!"});
    }
    res.send(restaurantArray);   
});


app.listen(port, () => {
console.log(`Restaurant Microservice listening on port ${port}`);
});