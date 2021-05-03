const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

exports.processJson = (req, res, next) => {
    getJSON; //?

}
    /*fetch(url)
    .then(res  => res.json())
    .then(out) => {
        return out;
    })
    .catch(err => console.log(err));

/*}


/*
//https://byui-cse.github.io/cse341-course/lesson03/items.json
/*fetch('https://byui-cse.github.io/cse341-course/lesson03/items.json')
.then(res => res.json())
.then((out) => {
    console.log('Output: ', out);
}).catch(err => console.error(err));
?
*/
const getJSON = (cb) => {
    fetch(url, (err, data) => {
        //console.log(fileContent);
        if (err) {
            //return [];
            cb([]);
        }
        else {
            //return JSON.parse(fileContent);
            cb(JSON.parse(data));
        }
    });
};