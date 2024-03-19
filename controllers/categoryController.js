const categoryModel=require("../models/categoryModel")
//create category
const createCatController=async(req,res)=>{
    try {
        const{title,imageUrl}=req.body;
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"please aad title"
            })
        }
       // const newCategory = new categoryModel({title,imageUrl})
       // await newCategory.save()
       const newCategory= await categoryModel.create({title,imageUrl})
        res.status(201).send({
            success:true,
            message:"new category created successfully",
            newCategory
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in create category api",
            error
        })
        
    }
}

// get all categories
const getAllCatController=async(req,res)=>{
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                status:false,
                message:"no categories found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all cat api",
            error
        })
        
    }
}

//update categories
const updateCatController=async(req,res)=>{
    try {
       //const{id}=req.params;
        const{title,imageUrl}=req.body;
        const updatedCategory= await categoryModel.findByIdAndUpdate(req.params.id,{title,imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(404).send({
                success:false,
                message:"no category found to update"
            })
        }
        res.status(201).send({
            success:true,
            message:"category updated successfully",
            updatedCategory
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update category controller api",
            error
        })
        
    }
}

//delete category
const deleteCatController=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:"please provide category id"
            })
        }
    const category = await categoryModel.findById(id);
    if(!category){
        return res.status(500).send({
            success:false,
            message:"no category found with this id"
        })
    }
    await categoryModel.findByIdAndDelete(id)
   // await categoryModel.findByIdAndDelete(category)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete cat controller api",
            error
        })

        
    }
}

module.exports={createCatController,getAllCatController,updateCatController,deleteCatController};