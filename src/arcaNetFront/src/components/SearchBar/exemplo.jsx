import {useState} from 'react';
import SearchBar from './SearchBar';

function ProductPage(){
    const [search, setSearch] = useState('');

    return (
        <div>
            <SearchBar
                onSearch={(texto) => console.log('Buscando por:', texto)}
                delay={400}
                ></SearchBar>
            <p>
                Showing Results: {search} 
            </p>
        </div>
    );
}