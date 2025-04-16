import bcrypt from 'bcrypt';

export const hashPass = async(password) => {
    try {
        const saltRound = 10;
        const hashed = await bcrypt.hash(password, saltRound);
        return hashed
    }catch(error){
        console.log(error);
    }
};

export const comparePass = async (password, hashed) =>{
    return bcrypt.compare(password,hashed)
}