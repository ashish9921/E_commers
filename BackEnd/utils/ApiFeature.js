class Apifeature{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;

    }
    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
    //regular exprestion and "i" for case sencitive yo yo samjha kya matlab "ABC" dala tab bhi "abc" serch hoga
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{}
        this.query=this.query.find({...keyword});
        return this ;
    }
    
    fealter(){
        const queryCopy={...this.queryStr}
        //remove some fild for category for catogory
        const removeFild=["keyword","page","limit"];
        removeFild.forEach(key=>delete queryCopy[key])
        //fealter for price range
        let queryStr = JSON.stringify(queryCopy);
    
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query=this.query.find(JSON.parse(queryStr));
        
        return this
    }
    pagination(resultPerPage){
        const curruntpage=Number(this.queryStr.page )||1;
        const Skip = resultPerPage*(curruntpage-1)
        this.query=this.query.limit(resultPerPage).skip(Skip);
        return this;

    }
}
module.exports=Apifeature