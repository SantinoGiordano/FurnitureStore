package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Furniture struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Price       float64            `json:"price"`
	Rating      int                `json:"rating"`
	InStock     bool               `json:"inStock"`
	Image       string             `json:"image"`
	Sale        int64              `json:"sale"`
	Favorite    bool               `json:"favorite"`
}

var collection *mongo.Collection

func main() {

	fmt.Println("hello world")

	app := fiber.New()

	furniture := []Furniture{}

	app.GET("/api/furniture", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"msg": "hello"})
	})

	log.Fatal(app.Listen(":8080"))
}

// func getFurniture(c *gin.Context) {
// 	var items []Furniture

// 	cursor, err := collection.Find(context.Background(), bson.M{})
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	defer cursor.Close(context.Background())

// 	for cursor.Next(context.Background()) {
// 		var item Furniture
// 		if err := cursor.Decode(&item); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}
// 		items = append(items, item)
// 	}

// 	if len(items) == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "No furniture found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, items)
// }
