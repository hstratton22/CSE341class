const deleteProduct = (btn) => {
    console.log('Clicked', btn);
    const prodId = btn.parentNode.querySelector('[name=productId').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf').value;
    const productElement = btn.closest('article');

    fetch('product/'+ prodId, {//path? /proveAssignments/prove05/admin/
        method: "DELETE",
        headers: {
            'csrf-token': csrf
        }
    }).then(result => { 
        //console.log(result);
        return result.json();
        //console.log(result);
    
    })
    .then(data => {
        console.log(data);
        //productElement.remove();// all modern browsers but not IE
        productElement.parentNode.removeChild(productElement); // for IE
    })
    .catch(err => {
        console.log(err);
    })
};