/**
 * Created by c.wright on 3/31/2016.
 */
var reg = (function(){
    return {

        _callback: {
            speakTo: function (where,data,how,callback) {
                if(typeof how == "string"){
                    if(how.toLowerCase() == "text"){
                        callback && callback($(where).text(data),how);
                    }
                    else if(how.toLowerCase() == "html"){
                        callback && callback($(where).html(data),how);
                    }
                    else{
                        if(how.toLowerCase() == "append"){
                            callback && callback($(where).append(data),how);
                        }
                    }
                }
            },
            z_call: function (callback,obj,val) {

                if(!Array.isArray(obj)){
                    if(typeof obj != "function"){
                        if(typeof obj == "object"){
                            if(!Array.isArray(val) && typeof val == "string" || val == "number"){
                                return callback.call(obj,val);
                            }
                        }
                    }
                }
            },
            z_apply: function (callback,obj,val) {

                if(!Array.isArray(obj)){
                    if(typeof obj != "function"){
                        if(typeof obj == "object"){
                            if(Array.isArray(val)){
                                return callback.apply(obj,val);
                            }
                        }
                    }
                }
            },
            z_bind: function (callback,obj,val) {

                if(typeof callback == "function"){
                    if(!Array.isArray(obj)){
                        if(typeof obj != "function"){
                            if(typeof obj == "object"){
                                if(typeof val == "string" || "number"){
                                    var func = callback.bind(obj);
                                    func = func(val);
                                    return func;
                                }
                                if(Array.isArray(val)){
                                    var func = this.z_apply(callback,obj,val);
                                    return func;
                                }
                            }
                        }
                    }
                }

            },
            o_keys: function (objLitKey,callback) {

                if(callback){
                    this.each(objLitKey, function (k,v) {
                        callback(k);
                    })
                }

            },
            o_val: function (objLitVal,callback) {
                if(callback){
                    this.each(objLitVal, function (k,v) {
                        callback(v);
                    });
                }
            },
            strChk: function (bool, callback) {
                if(typeof arguments[0] == "undefined"){
                    return;
                }
                else{
                    try{
                        if(typeof arguments[0] != "string"){
                            throw{
                                error: "Type String error",
                                message: "First parameter must be a string"
                            };
                        }
                        else{
                            callback(bool);
                        }
                    }
                    catch(e){
                        console.log(e.error + "\n");
                        console.log(e.message + "\n");
                        callback(e);
                    }
                }
            },

            newO: function (obj,callback) {

                if(callback){
                    if(typeof obj == 'object'){
                        if(Array.isArray(obj) == false){
                            callback(obj);
                        }
                    }
                    else{
                        callback("Not an object");
                    }
                }
            }
        },
        _func: {
            speakTo: function (where,data,how) {
                if(typeof how == "string"){
                    if(how.toLowerCase() == "text"){
                        return $(where).text(data);
                    }
                    else if(how.toLowerCase() == "html"){
                        return $(where).html(data);
                    }
                    else{
                        if(how.toLowerCase() == "append"){
                            return $(where).append(data);
                        }
                    }
                }
            },
            strChk: function (bool) {
                if(typeof arguments[0] == "undefined"){
                    return;
                }
                else{
                    try{
                        if(typeof arguments[0] != "string"){
                            throw{
                                error: "Type String error",
                                message: "First parameter must be a string"
                            };
                        }
                        else{
                            return bool;
                        }
                    }
                    catch(e){
                        return e;
                    }
                }
            },

            o_val: function (objLitVal,sep) {
                var str = "";
                sep = sep == "undefined" ? "" : sep;
                $.each(objLitVal, function (k,v) {
                    str += v + sep;
                });

                return str;
            },
            isNull: function (o) {

                var bool = false;
                var i = [];
                var count = 0;
                for(var oj in o){
                    if(!o[oj]){
                        bool = true;
                        i.push(oj);
                    }
                }
                return bool ? {
                    isNull: bool,
                    index: i.length > 1 ? i : i.join(""),
                    index_length: i.length
                } : {
                    isNull: bool,
                    index_length: i.length
                };
            },
            nonce: function (range) {
                var arr = [];

                for(var i = 0;i < (i > range ? range : Number.MAX_SAFE_INTEGER);i++){
                    arr.push(String.fromCharCode(Math.floor((Math.random() * 26) + 65)));
                    arr.push(String.fromCharCode(Math.floor((Math.random() * 12) + 48)));
                    arr.push(String.fromCharCode(Math.floor((Math.random() * 26) + 97)));
                }
                return arr.join("");
            },
            eins_arr: function (arr) {
                return arr.join("").split(",");
            },
            each: function (obj,callback) {
                if(callback){
                    for(var i in obj){
                        callback(i,obj[i]);
                    }
                }
            },
            isInstanceOf: function (ref,fun) {
                if(typeof fun == "function"){
                    if(typeof ref == "object"){
                        if(Array.isArray(ref) == false){
                            return ref instanceof fun;
                        }
                    }
                }
            },
            _instanceOf: function(obj_vef){

                return obj_vef instanceof eval(Object.getPrototypeOf(obj_vef).constructor.name);
            },
            parentName: function(obj_tef){
                return obj_tef instanceof eval(Object.getPrototypeOf(obj_tef).constructor.name) ? Object.getPrototypeOf(obj_tef).constructor.name : false;
            },
            chg_prop_name: function(obt,oldprop,newprop){

                var hold = null;
                if(oldprop in obt && typeof obt == "object"){
                    hold = JSON.stringify(obt);
                }
                else{
                    $.each(obt,function(k,v){
                        if(oldprop in v && typeof v == "object"){
                            hold = JSON.stringify(obt);
                        }
                    });
                }
                if(hold.match(/[^\:]/)){
                    hold = hold.replace(oldprop,reg._func.escape_entities(newprop));
                }
                obt = JSON.parse(hold);

                return obt;
            },
            ctr_name: function (obj_ref) {

                try{
                    if(obj_ref instanceof eval(Object.getPrototypeOf(obj_ref).constructor.name)){
                        return Object.getPrototypeOf(obj_ref).constructor.name;
                    }
                    else{
                        throw{
                            error: "instanceOf Error",
                            message: obj_ref + "not the instance of the apparent function"
                        }
                    }
                }
                catch(err){
                    return err.message;

                }

            },
            ass_arr: function(addTo,keyz,valz){

                if(Array.isArray(addTo)){
                    if(Array.isArray(keyz)){
                        if(Array.isArray(valz)){
                            for(var i in keyz){
                                for(var j in valz){
                                    addTo[keyz[i]] = valz[j];
                                }
                            }
                        }
                    }
                }
            },
            gesc_ent: function (val,prop) {
                const temp = {
                    less_than: ["<","&#60;"],        //&#60;
                    greater_than: [">","&#62;"],     //&#62;
                    open_paren: ["(","&#40;"],     //&#40;
                    close_paren: [")","&#41;"],    //&#41;
                    open_brace: ["{","&#123;"],   //&#123;
                    close_brace: ["}","&#125;"],  //&#125;
                    question: ["?","&#63;"],      //&#63;
                    percent: ["%","&#37;"],      //&#37;
                    front_slash: ["\/","&#47;"],    //&#47;
                    back_slash: ["\\","&#92;"],    //&#92;
                    open_brac: ["[","&#91;"],      //&#91;
                    close_brac: ["]","&#93;"],     //&#93;
                    dollar_sign: ["$","&#36;"],  //&#36;
                    double_quote: ['"',"&#34;"],   //&#34;
                    single_quote: ["'","&#39;"],   //&#39;       //&apos; is not recommended
                    e_qual: ["=","&#61;"],        //&#61;]
                    period: [".","&#46;"]
                };
                return val.replace(temp[prop][0],temp[prop][1]);
            },
            esc_ent: function(val){

                const temp = {
                    less_than: ["<","&#60;"],        //&#60;
                    greater_than: [">","&#62;"],     //&#62;
                    open_paren: ["(","&#40;"],     //&#40;
                    close_paren: [")","&#41;"],    //&#41;
                    open_brace: ["{","&#123;"],   //&#123;
                    close_brace: ["}","&#125;"],  //&#125;
                    question: ["?","&#63;"],      //&#63;
                    percent: ["%","&#37;"],      //&#37;
                    front_slash: ["\/","&#47;"],    //&#47;
                    back_slash: ["\\","&#92;"],    //&#92;
                    open_brac: ["[","&#91;"],      //&#91;
                    close_brac: ["]","&#93;"],     //&#93;
                    dollar_sign: ["$","&#36;"],  //&#36;
                    double_quote: ['"',"&#34;"],   //&#34;
                    single_quote: ["'","&#39;"],   //&#39;       //&apos; is not recommended
                    e_qual: ["=","&#61;"],        //&#61;]
                    period: [".","&#46;"]
                };

                for(var i = 0;i < val.length;i++){

                    this.each(temp, function (a,b) {
                        if(val[i] == b[0]){
                            val = val.replace(val[i],b[1]);
                        }
                    })
                }
                return val;
            },
            sov_switch: function(obj_var){

                var temp = {};

                this.each(obj_var, function (k,v) {
                    temp[v] = k;
                });

                obj_var = temp;

                return obj_var;
            },
            ov_switch: function (obj_var,val) {

                var temp = {};

                if(val in obj_var && val){

                    this.each(obj_var, function (a,b) {
                        if(a == val){
                            temp[b] = a;
                        }
                        else{
                            temp[a] = b;
                        }
                    });

                    obj_var = temp;
                    return obj_var;
                }
                else{
                    if(!val){
                        throw new Error("Property is empty");
                    }
                    if(!(val in obj_var)){
                        throw new Error("Property not in the object");
                    }
                }


            },
            validate_email: function(val,bool){

                return typeof bool === "boolean" && typeof val == "string" && bool == true ? val.match(/^[\w]+[@]{1}[\w]+\.[\w]{1,4}$/i) : val.match(/^[a-zA-Z0-9_-]+[@]{1}[a-zA-Z0-9_-]+\.[a-zA-Z]{1,4}$/i);
            },
            validate_zip_code: function(val){

                return typeof val === "string" ? val.match(/\b[\d]{5}-?[\d]*\b/) : false;
            },
            xml_tags_match: function (val) {

                if(val.match(/^<[a-z]+>\w+<\/[a-z]+>$/i)){
                    val = val.match(/(^<?\/?[a-z]+>?)/);
                }

                return val[0] === val[1];
            },
            ph_match: function(vala){
                if(typeof vala == "string"){
                    //9081274528
                    if(vala.match(/^[0-9]{10}$/)){
                        return vala.match(/^[0-9]{10}$/) != null;
                    }
                    //(908) 127-4528
                    else if(vala.match(/^\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}$/)){
                        return vala.match(/^\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}$/) != null;
                    }
                    else{
                        //908-127-4528
                        if(vala.match(/^[0-9]{3}-[0-9]{3}[0-9]{4}$/)){
                            return vala.match(/^[0-9]{3}-[0-9]{3}[0-9]{4}$/) != null;
                        }
                    }
                }
                else{
                    return false;
                }
            },
            match_ph: function(val){
                return val.match(/\(?\d+\)?-?\d+-?\d+/i);
            },
            name_match: function(str){
                return str.match(/^([a-z]+) ([a-z]+)?\s?([a-z]+)$/i) !== null;
            }
        }

    };

}());




