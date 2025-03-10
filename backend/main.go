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
	Sale        int64   `json:"sale"`
	Favorite    bool    `json:"favorite"`
}

var furnitureItems = []Furniture{
	{"1", "Modern Sofa", "This sofa offers a sleek and contemporary design with plush cushioning. Perfect for any modern living room, providing both comfort and style.", 599.99, 4, true, "/ModernSofa.jpg", 0, true},
	{"2", "Wooden Dining Table", "Crafted from solid oak, this dining table combines durability with elegance. Ideal for family gatherings, it provides ample space and a sophisticated look.", 799.49, 5, false, "/woodenTable.jpg", 0, false},
	{"3", "Ergonomic Office Chair", "Designed to provide ultimate comfort during long hours of sitting, this office chair features lumbar support and adjustable settings. A must-have for productivity and comfort.", 249.99, 3, true, "/officeChair.jpg", 10, false},
	{"4", "Queen Bed Frame", "A sturdy and stylish metal bed frame that complements any bedroom decor. Its modern design is perfect for supporting a queen-size mattress while offering a minimalist look.", 499.99, 5, false, "/queenBedFrame.jpg", 20, true},
	{"5", "Bookshelf", "This 5-tier bookshelf is designed to maximize your storage space while maintaining a sleek appearance. Perfect for displaying books, plants, and decor in any room.", 199.99, 2, true, "/bookshelf.jpg", 15, false},
	{"6", "Leather Recliner", "Relax in style with this plush leather recliner. Its soft leather upholstery and recline functionality make it perfect for unwinding after a long day.", 899.99, 5, true, "/leaterRecliner.jpg", 0, false},
	{"7", "TV Stand", "A minimalist TV stand with ample storage space for electronics, DVDs, and more. Its clean lines and neutral color make it a perfect addition to any living room.", 349.99, 3, false, "/tvStand.jpg", 0, true},
	{"8", "Coffee Table", "This glass-top coffee table is designed with modern style and durability in mind. The steel legs and minimalist design complement any living room setting.", 179.99, 4, true, "/coffeeTable.jpg", 0, false},
	{"9", "Nightstand", "With two spacious drawers, this modern nightstand offers a perfect balance of style and function. Ideal for storing essentials and adding a touch of elegance to your bedroom.", 129.99, 1, false, "/nighstand.jpg", 0, false},
	{"10", "Sectional Sofa", "This L-shaped sectional sofa is designed for comfort and style. Perfect for large living rooms, it provides ample seating while adding a modern touch to your home.", 1199.99, 5, true, "/sectionalSofa.jpg", 15, true},
	{"11", "Dresser", "A 6-drawer wooden dresser that combines traditional design with modern convenience. Spacious enough for all your clothing, it adds a rustic charm to any bedroom.", 699.99, 3, false, "/dresser.jpg", 30, false},
	{"12", "Bar Stools", "Set of two adjustable bar stools perfect for home bars or kitchen islands. Their sleek design and adjustable height make them both functional and stylish.", 149.99, 2, true, "/barstools.jpg", 40, false},
	{"13", "Outdoor Patio Set", "This 4-piece rattan patio set is perfect for outdoor gatherings. Comfortable seating with weather-resistant cushions ensures you can enjoy the outdoors in style.", 899.99, 4, false, "/outdoorpatio.jpg", 5, false},
	{"14", "Gaming Chair", "This ergonomic gaming chair offers optimal comfort during long gaming sessions. It includes adjustable armrests and lumbar support to enhance your gaming experience.", 279.99, 5, true, "/GamingChair.jpg", 0, false},
	{"15", "Kitchen Island", "This rolling kitchen island with storage space provides extra counter space and organization. Perfect for preparing meals or serving guests, it adds functionality to your kitchen.", 499.99, 1, false, "/Kitchen Island.jpg", 10, true},
	{"16", "Convertible Sofa Bed", "This multi-functional sofa bed easily converts from a comfortable sofa to a full-size bed. Ideal for guest rooms or small apartments, it offers versatility and space-saving benefits.", 399.99, 2, true, "/convertiblesofabed.jpg", 0, false},
	{"17", "Accent Chair", "Add a pop of color and style to any room with this modern accent chair. It features plush seating and a contemporary design that will elevate your living space.", 229.99, 3, false, "/accentChair.jpg", 0, false},
	{"18", "Storage Bench", "This bench doubles as both seating and storage. Perfect for entryways or bedrooms, it provides a stylish place to sit while offering extra storage space for blankets or shoes.", 249.99, 4, true, "/storage bench.jpg", 0, false},
	{"19", "Glass Display Cabinet", "This modern glass-door display cabinet allows you to showcase your prized possessions. Its sleek design and sturdy build make it an elegant addition to any living room or hallway.", 549.99, 2, false, "/glass display cabinet.jpg", 15, true},
	{"20", "Standing Desk", "This height-adjustable standing desk offers flexibility for a healthier work environment. Switch from sitting to standing with ease, making it perfect for home offices.", 699.99, 5, true, "/standingdesk.jpg", 30, false},
}

func main() {
	router := gin.Default()
	router.GET("/api/furniture", getFurniture)
	router.GET("/api/furniture/:id", getFurnitureByID)
	// app.Post("/api/todos", createTodo)
	// app.Patch("/api/todos/:id", updateTodo)
	// app.Delete("/api/todos/:id", getFurniture)

	router.Run(":8080")
}

func getFurniture(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, furnitureItems)
}

func getFurnitureByID(c *gin.Context) {
	id := c.Param("id")

	for _, item := range furnitureItems {
		if item.ID == id {
			c.IndentedJSON(http.StatusOK, item)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Furniture item not found"})
}
