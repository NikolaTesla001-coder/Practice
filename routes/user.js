const {Router}=require('express');
const User = require('../models/user');
const router=Router();
const { requireAdmin } = require('../middlewares/auth');


router.get('/signup',(req,res)=>{
    return res.render("signup")
})

router.get('/login',(req,res)=>{
    return res.render('login')
})

router.get('/admin/projects', requireAdmin, (req, res) => {
    // only admin can see this
    res.render('admin-projects');
});

router.post('/signup',async(req,res)=>{
    const {name,email,password,role}=req.body;
    await User.create({
        name,
        email,
        password,
        role
    })
    return res.redirect('/user/login');
})

router.post('/login', async (req, res) => {
    const { email, password,role } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('User not found');
    }

    if (user.password !== password) {
        return res.status(400).send('Invalid password');
    }
    if(user.role=='admin') {
    return res.render('admin-projects');

    }
    else{
        return  res.render('projects', { user });
    }
});




module.exports=router;

