package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Furniture struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Rating      int     `json:"rating"`
	InStock     bool    `json:"inStock"`
	Image       string  `json:"image"`
	Sale		int64   `json:"sale"`
}

var furnitureItems = []Furniture{
	{"1", "Modern Sofa", "This sofa offers a sleek and contemporary design with plush cushioning. Perfect for any modern living room, providing both comfort and style.", 599.99, 4, true, "https://placehold.co/100x100", 15},
	{"2", "Wooden Dining Table", "Crafted from solid oak, this dining table combines durability with elegance. Ideal for family gatherings, it provides ample space and a sophisticated look.", 799.49, 5, false, "https://placehold.co/100x100", 20},
	{"3", "Ergonomic Office Chair", "Designed to provide ultimate comfort during long hours of sitting, this office chair features lumbar support and adjustable settings. A must-have for productivity and comfort.", 249.99, 3, true, "https://placehold.co/100x100", 10},
	{"4", "Queen Bed Frame", "A sturdy and stylish metal bed frame that complements any bedroom decor. Its modern design is perfect for supporting a queen-size mattress while offering a minimalist look.", 499.99, 5, false, "https://placehold.co/100x100", 25},
	{"5", "Bookshelf", "This 5-tier bookshelf is designed to maximize your storage space while maintaining a sleek appearance. Perfect for displaying books, plants, and decor in any room.", 199.99, 2, true, "https://placehold.co/100x100", 30},
	{"6", "Leather Recliner", "Relax in style with this plush leather recliner. Its soft leather upholstery and recline functionality make it perfect for unwinding after a long day.", 899.99, 5, true, "https://placehold.co/100x100", 12},
	{"7", "TV Stand", "A minimalist TV stand with ample storage space for electronics, DVDs, and more. Its clean lines and neutral color make it a perfect addition to any living room.", 349.99, 3, false, "https://placehold.co/100x100", 18},
	{"8", "Coffee Table", "This glass-top coffee table is designed with modern style and durability in mind. The steel legs and minimalist design complement any living room setting.", 179.99, 4, true, "https://placehold.co/100x100", 22},
	{"9", "Nightstand", "With two spacious drawers, this modern nightstand offers a perfect balance of style and function. Ideal for storing essentials and adding a touch of elegance to your bedroom.", 129.99, 1, false, "https://placehold.co/100x100", 27},
	{"10", "Sectional Sofa", "This L-shaped sectional sofa is designed for comfort and style. Perfect for large living rooms, it provides ample seating while adding a modern touch to your home.", 1199.99, 5, true, "https://placehold.co/100x100", 8},
	{"11", "Dresser", "A 6-drawer wooden dresser that combines traditional design with modern convenience. Spacious enough for all your clothing, it adds a rustic charm to any bedroom.", 699.99, 3, false, "https://placehold.co/100x100", 16},
	{"12", "Bar Stools", "Set of two adjustable bar stools perfect for home bars or kitchen islands. Their sleek design and adjustable height make them both functional and stylish.", 149.99, 2, true, "https://placehold.co/100x100", 21},
	{"13", "Outdoor Patio Set", "This 4-piece rattan patio set is perfect for outdoor gatherings. Comfortable seating with weather-resistant cushions ensures you can enjoy the outdoors in style.", 899.99, 4, false, "https://placehold.co/100x100", 9},
	{"14", "Gaming Chair", "This ergonomic gaming chair offers optimal comfort during long gaming sessions. It includes adjustable armrests and lumbar support to enhance your gaming experience.", 279.99, 5, true, "https://placehold.co/100x100", 23},
	{"15", "Kitchen Island", "This rolling kitchen island with storage space provides extra counter space and organization. Perfect for preparing meals or serving guests, it adds functionality to your kitchen.", 499.99, 1, false, "https://placehold.co/100x100", 11},
	{"16", "Convertible Sofa Bed", "This multi-functional sofa bed easily converts from a comfortable sofa to a full-size bed. Ideal for guest rooms or small apartments, it offers versatility and space-saving benefits.", 399.99, 2, true, "https://placehold.co/100x100", 14},
	{"17", "Accent Chair", "Add a pop of color and style to any room with this modern accent chair. It features plush seating and a contemporary design that will elevate your living space.", 229.99, 3, false, "https://placehold.co/100x100", 19},
	{"18", "Storage Bench", "This bench doubles as both seating and storage. Perfect for entryways or bedrooms, it provides a stylish place to sit while offering extra storage space for blankets or shoes.", 249.99, 4, true, "https://placehold.co/100x100", 6},
	{"19", "Glass Display Cabinet", "This modern glass-door display cabinet allows you to showcase your prized possessions. Its sleek design and sturdy build make it an elegant addition to any living room or hallway.", 549.99, 2, false, "https://placehold.co/100x100", 24},
	{"20", "Standing Desk", "This height-adjustable standing desk offers flexibility for a healthier work environment. Switch from sitting to standing with ease, making it perfect for home offices.", 699.99, 5, true, "https://placehold.co/100x100", 13},
}

func main() {
	router := gin.Default()
	router.GET("/api/furniture", getFurniture)

	// app.Post("/api/todos", createTodo)
	// app.Patch("/api/todos/:id", updateTodo)
	// app.Delete("/api/todos/:id", getFurniture)

	router.Run(":8080")
}

func getFurniture(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, furnitureItems)
}
