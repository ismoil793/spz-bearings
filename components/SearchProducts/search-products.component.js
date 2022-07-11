import React, {useState} from 'react';
import {useRouter} from "next/router";
import SearchText from "../../static/locales/search";

const SearchProducts = () => {

   const {push, locale, query} = useRouter()
   const [search, setSearch] = useState(query.search ?? '')

   const handleSearchSubmit = (e) => {
      e.preventDefault()
      push(`/search?search=${search}`)
   }

   return (
       <section className="search-section">
          <div className="container">
             <div className="col-12">
                <form className={"contact_form"} onSubmit={handleSearchSubmit}>
                   <div className={"form-group row align-items-center"}>
                      <div className={"col-md-3 p-0"}>
                         {SearchText[locale].input}
                      </div>
                      <input
                          type="text"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          className={"form-control col"}
                          placeholder={SearchText[locale].input}
                      />
                      <button className="btn-search" type="submit">
                         <i className="fas fa-search"/>
                      </button>
                   </div>
                </form>
             </div>
          </div>
       </section>
   );
};

export default SearchProducts;