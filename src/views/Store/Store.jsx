import {
  Grid,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Pagination,
  Input,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useState, useEffect } from "react";
import http from "../../lib/http";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Store = () => {
  const api = http({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [newPriceRange, setNewPriceRange] = useState([0, 200]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [asc, setAsc] = useState("asc");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getCategories();
    getFilteredProducts(null);
    return () => {};
  }, []);

  useEffect(() => {
    getFilteredProducts();
    return () => {};
  }, [category, priceRange, sort, asc, search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPriceRange(newPriceRange);
    }, 1000);
    return () => {
      clearTimeout(delay);
    };
  }, [newPriceRange]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(newSearch);
    }, 1000);
    return () => {
      clearTimeout(delay);
    };
  }, [newSearch]);

  async function getFilteredProducts(_, page = 1) {
    const options = {
      params: {
        search,
        page,
        sort,
        category,
        asc,
        "min-price": priceRange[0],
        "max-price": priceRange[1],
      },
    };
    const response = await api.request("/products/filter", options);
    setPage(page);
    setPageCount(response.data?.meta?.last_page);
    setProducts(response.data?.data);
  }

  async function getCategories() {
    const response = await api.get("/categories");
    setCategories(response.data.data);
  }

  function handleChangePriceRange(e, newValue) {
    setNewPriceRange(newValue);
  }

  function valuetext(value) {
    return value;
  }

  async function addToCart(productId) {
    if (localStorage.getItem("token")) {
      try {
        const body = {
          product_id: productId,
        };
        await api.post("/cart", body);
        setOpenSnackbar(true);
        window.dispatchEvent(new Event("getCartItems"));
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/login");
    }
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product Added to cart
        </Alert>
      </Snackbar>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl sx={{ width: "100%" }}>
                <Input
                  placeholder="Search Item..."
                  onChange={(e) => setNewSearch(e.target.value)}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl sx={{ mb: 4 }}>
                <FormLabel id="category">Category</FormLabel>
                <RadioGroup
                  aria-labelledby="category"
                  name="category"
                  sx={{
                    flexDirection: { xs: "row", sm: "column" },
                  }}
                  onChange={(e) => setCategory(e.currentTarget.value)}
                >
                  <FormControlLabel value={0} control={<Radio />} label="All" />
                  {categories.map((category, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={category.id}
                        control={<Radio />}
                        label={category.name}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mb: 4 }}>
                <FormLabel id="sort-by">Sort by</FormLabel>
                <RadioGroup
                  aria-labelledby="sort-by"
                  name="sort-by"
                  sx={{
                    flexDirection: { xs: "row", sm: "column" },
                  }}
                  onChange={(e) => setSort(e.currentTarget.value)}
                >
                  <FormControlLabel
                    value={"none"}
                    control={<Radio />}
                    label="None"
                  />
                  <FormControlLabel
                    value={"price"}
                    control={<Radio />}
                    label="Price"
                  />
                  <FormControlLabel
                    value={"name"}
                    control={<Radio />}
                    label="Name"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mb: 4 }}>
                <FormLabel id="sort-by-ad">Ascending/Descending</FormLabel>
                <RadioGroup
                  aria-labelledby="sort-by-ad"
                  name="sort-by"
                  sx={{
                    flexDirection: { xs: "row", sm: "column" },
                  }}
                  onChange={(e) => setAsc(e.currentTarget.value)}
                >
                  <FormControlLabel
                    value={"asc"}
                    control={<Radio />}
                    label="Ascending"
                  />
                  <FormControlLabel
                    value={"desc"}
                    control={<Radio />}
                    label="Descending"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="priceRange">Price Range</FormLabel>
                <Slider
                  aria-labelledby="priceRange"
                  value={newPriceRange}
                  onChange={handleChangePriceRange}
                  valueLabelDisplay="auto"
                  max={2000}
                  getAriaValueText={valuetext}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item container spacing={4} xs={12} sm={9}>
          {products.map((product, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h5"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {product.name}
                      <Typography
                        variant="span"
                        component="span"
                        sx={{ fontWeight: "lighter", fontSize: ".8rem" }}
                      >
                        ₱{product.price}
                      </Typography>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={getFilteredProducts}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Store;
