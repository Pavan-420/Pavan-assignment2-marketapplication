const express = require(`express`);
const bodyParser = require(`body-parser`);
const connection = require(`./config/db`);
const Product = require(`./models/productsModel`);
const Category = require(`./models/categoriesModel`);
const router = express.Router();

const app = express();


app.use(bodyParser.json());
app.use('/api/products/', router);


// Find all Products which name contains 'kw'
router.route('/').get(async (req, res) => {
    const keyword = req.query.name;
    try {
        const products = await Product.find({ name: new RegExp(keyword, 'i') });
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.route('/').get(async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


router.route('/').post(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update Product by id
router.route('/:id').put(async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedProduct);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


// Remove Product by id
router.route('/:id').delete(async (req, res) => {
    try {
        const removedProduct = await Product.findByIdAndRemove(req.params.id);
        if (!removedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Remove all Products
router.route('/').delete(async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ message: "All products deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});















connection.once('open',()=>{
    console.log("DB connected......")
})

app.listen(3000, ()=>{

    app.get(`/`, (req, res)=>{
        res.json({"message": "Welcome to Dress Store Application."});
    });
    console.log("Server is running... http://localhost:3000");
})