import Member from "../models/Member.js";

export const createMember = async (req, res, next) => {
  try {
    const { name, email, phone, membershipType, joiningDate } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Member with this email already exists." });
    }

    const member = await Member.create({
      name,
      email,
      phone,
      membershipType,
      joiningDate,
    });

    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

export const getAllMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

export const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const { name, email, phone, membershipType, joiningDate } = req.body;
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, membershipType, joiningDate },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    next(error);
  }
};
