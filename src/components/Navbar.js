import React from 'react';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, } from "react-bootstrap";

<div>
<Navbar bg="dark" variant="dark" >
    <Navbar.Brand href="#home">Movies!</Navbar.Brand>
    <Nav className="mr-auto">
        <NavDropdown title="Filter" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => filteredMovies(28)} href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(12)} href="#action/3.2">Adventure</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(35)} href="#action/3.1">Comedy</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(80)} href="#action/3.2">Crime</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(99)} href="#action/3.3">Documentary</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(18)} href="#action/3.2">Drama</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(36)} href="#action/3.2">Fantasy</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(36)} href="#action/3.2">History</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(27)} href="#action/3.2">Horror</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(10749)} href="#action/3.2">Romance</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(878)} href="#action/3.2">Science Fiction</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(53)} href="#action/3.2">Thriller</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Favorites</NavDropdown.Item>
        </NavDropdown>
    </Nav>
    <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
        <Button onClick={() => sortByPopularity()} variant="outline-success">Most Popular</Button>
        <Button onClick={() => sortByLeastPopularity()} variant="outline-success">Least Popular</Button>
        <Button onClick={() => sortByHighestRating()} variant="outline-success">Top Rated</Button>
    </Form> 
    </div>