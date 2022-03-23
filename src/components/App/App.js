import React, { useEffect, useState, useRef} from 'react';
import './App.css'
import { getList, setItem } from '../../services/list';

function App() {
    const [alert, setAlert] = useState(false);
    const [itemInput, setItemInput] = useState('');
    const [list, setList] = useState([]);
    //useRef preserve the variavel during the lifetime of the component
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (list.length && !alert) return;
        getList()
        .then(itens => {
            if(mounted.current) setList(itens);
        })
        return () => mounted.current = false;
    }, [alert, list])

    //Will remove the menssage after 1s whenever the 'alert' is changed
    useEffect(() => {
        if(alert) setTimeout(() => {
            if(mounted.current) setAlert(false);
        }, 1000);
    }, [alert]);

    const handleSubmit = (e) => {
        //Prevent form reloading the page
        e.preventDefault();
        setItem(itemInput)
        .then(() => {
            if (mounted.current) {
                setItemInput('');
                setAlert(true);
            }
        });
    }

    return (  
        <div className='App'>
            <h1>My Grocery List</h1>
            <ul>
                {list.map(item => <li key={item.id}>{item.item}</li>)}
            </ul>
            {alert && <h2>Submit sucessful</h2>}
            <form onSubmit={handleSubmit}>
                <label>
                    <p>New Item</p>
                    <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default App;