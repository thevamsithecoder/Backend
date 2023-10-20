const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");


const getContact = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({ user_id : req.user.id })
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
       res.status(400);
       throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    })
    res.status(201).json(contact);
});

const getContactWithId = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }
});

const updateContact = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const contact = await Contact.findByIdAndUpdate(id, body, { new : true });
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }
    res.status(200).json(contact);
})



module.exports = { getContact, createContact, getContactWithId, updateContact, deleteContact};