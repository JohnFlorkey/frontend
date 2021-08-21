import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyAPI from "./api";

function CompanyList() {
  const INITIAL_FORM_STATE = { searchTerm: "" };
  const [companyList, setCompanyList] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    async function getCompaniesAPI(searchTerm) {
      const response = await JoblyAPI.getCompanies(searchTerm);
      setCompanyList(response);
    }
    getCompaniesAPI(searchTerm);
  }, [searchTerm]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // if formData.searchTerm has a value use it, otherwise use undefined
    const searchValue = formData.searchTerm ? formData.searchTerm : undefined;
    setSearchTerm(searchValue);
    //clear the form input
    setFormData(INITIAL_FORM_STATE);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="searchTerm"
          placeholder="enter search term"
          value={formData.searchTerm}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      {companyList.map((c) => (
        <CompanyCard
          key={c.handle}
          handle={c.handle}
          name={c.name}
          description={c.description}
        />
      ))}
    </div>
  );
}

export default CompanyList;
