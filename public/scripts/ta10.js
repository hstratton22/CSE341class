const socket = io('/');
socket.on('update-list', () => {
    populateList()
});
const populateList = () => {
    const nameList = document.getElementById('nameList');

    fetch('ta10/fetchAll')
        .then(res => res.json())
        .then(data => {
            while (nameList.firstChild) nameList.firstChild.remove()

            for (const avenger of data.avengers) {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(avenger.name));
                nameList.appendChild(li);
            }
        })
        .catch(err => {
            console.log(err);
        })
}
const submitName = () => {
    const newName = document.getElementById('newName').value;
    fetch('ta10/insertName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName })
    })
        .then(res => {
            document.getElementById('newName').value = '';
            populateList();
            socket.emit('new-name')
        })
        .catch(err => {
            document.getElementById('newName').value = '';
            console.error(err);
        })
}
populateList();