const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const db = require("./config/db");
const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Static Images
// ==============================
app.use("/images", express.static(path.join(__dirname, "assets/images")));

// ==============================
// Home Route
// ==============================
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.delete("/hello", (req, res) => {
  res.json({
    success: true,
    message: "DELETE Works",
  });
});

// ==============================
// Test Database
// ==============================
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
});

// ==============================
// Signup API
// ==============================
app.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;

  const sql = "INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)";

  db.query(sql, [name, email, password, phone], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "User Registered Successfully",
    });
  });
});

// ==============================
// Login API
// ==============================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    if (result[0].password !== password) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      user: result[0],
    });
  });
});

// ==============================
// Restaurants API
// ==============================

// Get All Restaurants
app.get("/restaurants", (req, res) => {
  const sql = "SELECT * FROM restaurants";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      restaurants: result,
    });
  });
});

// Get Restaurant By ID
app.get("/restaurants/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM restaurants WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      restaurant: result[0],
    });
  });
});

// ==============================
// Foods API
// ==============================

// Get All Foods
app.get("/foods", (req, res) => {
  const sql = "SELECT * FROM foods";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      foods: result,
    });
  });
});

// Get Food By ID
app.get("/foods/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM foods WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      food: result[0],
    });
  });
});

// ==============================
// Search Foods
// ==============================
app.get("/search/:name", (req, res) => {
  const { name } = req.params;

  const sql = "SELECT * FROM foods WHERE name LIKE ?";

  db.query(sql, [`%${name}%`], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      foods: result,
    });
  });
});

// ==============================
// Add To Cart
// ==============================
app.post("/cart", (req, res) => {
  const { user_id, food_id } = req.body;

  const checkSql = "SELECT * FROM cart WHERE user_id=? AND food_id=?";

  db.query(checkSql, [user_id, food_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length > 0) {
      const updateSql =
        "UPDATE cart SET quantity=quantity+1 WHERE user_id=? AND food_id=?";

      db.query(updateSql, [user_id, food_id], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.json({
          success: true,
          message: "Quantity Updated",
        });
      });
    } else {
      const insertSql =
        "INSERT INTO cart(user_id,food_id,quantity) VALUES(?,?,1)";

      db.query(insertSql, [user_id, food_id], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.json({
          success: true,
          message: "Added To Cart",
        });
      });
    }
  });
});

// ==============================
// Get Cart
// ==============================
app.get("/cart/:user_id", (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT
      cart.id,
      cart.quantity,
      foods.id AS food_id,
      foods.name,
      foods.price,
      foods.image
    FROM cart
    INNER JOIN foods
      ON cart.food_id = foods.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      cart: result,
    });
  });
});

// ==============================
// Increase Quantity
// ==============================
app.put("/cart/increase/:id", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE cart SET quantity=quantity+1 WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Quantity Increased",
    });
  });
});

// ==============================
// Decrease Quantity
// ==============================
app.put("/cart/decrease/:id", (req, res) => {
  const { id } = req.params;

  const checkSql = "SELECT quantity FROM cart WHERE id=?";

  db.query(checkSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result[0].quantity > 1) {
      const updateSql = "UPDATE cart SET quantity=quantity-1 WHERE id=?";

      db.query(updateSql, [id], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.json({
          success: true,
          message: "Quantity Decreased",
        });
      });
    } else {
      const deleteSql = "DELETE FROM cart WHERE id=?";

      db.query(deleteSql, [id], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.json({
          success: true,
          message: "Item Removed",
        });
      });
    }
  });
});

// ==============================
// Remove Item
// ==============================
app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM cart WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Item Removed Successfully",
    });
  });
});
app.post("/order", (req, res) => {
  const { customer_name, phone, address, user_id } = req.body;

  // Get all cart items
  const cartSql = `
    SELECT
      cart.food_id,
      cart.quantity,
      foods.name,
      foods.price
    FROM cart
    INNER JOIN foods
      ON cart.food_id = foods.id
    WHERE cart.user_id = ?
  `;

  db.query(cartSql, [user_id], (err, cartItems) => {
    console.log("Cart Items:", cartItems);
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (cartItems.length === 0) {
      return res.json({
        success: false,
        message: "Cart is Empty",
      });
    }

    // Calculate Total
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );

    // Insert Order
    const orderSql = `
      INSERT INTO orders
      (customer_name, phone, address, total)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      orderSql,
      [customer_name, phone, address, total],
      (err, orderResult) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        const order_id = orderResult.insertId;
        console.log("Order ID:", order_id);

        // Prepare order items
        const values = cartItems.map((item) => [
          order_id,
          item.food_id,
          item.name,
          item.quantity,
          item.price,
        ]);

        const orderItemsSql = `
          INSERT INTO order_items
          (order_id, food_id, food_name, quantity, price)
          VALUES ?
        `;

        db.query(orderItemsSql, [values], (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          // Clear Cart
          db.query("DELETE FROM cart WHERE user_id=?", [user_id], (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                error: err.message,
              });
            }

            res.json({
              success: true,
              message: "Order Placed Successfully",
              order_id,
              total,
            });
          });
        });
      },
    );
  });
});
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Started on Port ${PORT}`);
});
