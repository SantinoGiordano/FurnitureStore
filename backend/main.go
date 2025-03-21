package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Furniture struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id, omitempty"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Price       float64            `json:"price"`
	Rating      int                `json:"rating"`
	InStock     bool               `json:"inStock"`
	Image       string             `json:"image"`
	Sale        int64              `json:"sale"`
	Favorite    bool               `json:"favorite"`
	InCart      bool               `json:"inCart"`
}

var collection *mongo.Collection

func CORSMiddleware(c *fiber.Ctx) error {
	c.Set("Access-Control-Allow-Origin", "*")
	// c.Set("Access-Control-Allow-Credentials", "true")
	c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

	// Handle preflight request
	if c.Method() == "OPTIONS" {
		return c.SendStatus(fiber.StatusNoContent)
	}

	return c.Next()
}

func main() {

	fmt.Println("hello world")

	// Load environment variables from env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error Loading .env file:", err)
	}
	// Connetion code to mongo
	MONGO_URI := os.Getenv("MONGO_URI")
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to Mongo")

	// Initialize collection
	collection = client.Database("golang_db").Collection("furniture")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
		// AllowCredentials: true,
		AllowHeaders: "Content-Type",
	}))

	app.Get("/api/furniture", getFurniture)
	app.Get("/api/furniture/:id", getFurnitureSingle)
	app.Put("/api/furniture/favorited/:id", putFavorite)
	app.Put("/api/furniture/cart/:id", updateFurnitureInCart)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func getFurniture(c *fiber.Ctx) error {
	var furniture []Furniture

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var item Furniture
		if err := cursor.Decode(&item); err != nil {
			return err
		}

		furniture = append(furniture, item)
	}
	if err := cursor.Err(); err != nil {
		return err
	}
	return c.JSON(furniture)
}

func getFurnitureSingle(c *fiber.Ctx) error {
	id := c.Params("id")

	// Convert id to MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
	}

	// Query MongoDB for the item
	var furniture Furniture
	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&furniture)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).SendString("Furniture item not found")
		}
		return c.Status(fiber.StatusInternalServerError).SendString("Database error")
	}

	// Return the found item
	return c.JSON(furniture)
}

func putFavorite(c *fiber.Ctx) error {
	_id := c.Params("id")

	// ✅ Convert id to ObjectID
	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid ID format")
	}

	// ✅ Read request body to get favorite value from frontend
	var body struct {
		Favorite bool `json:"favorite"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request body")
	}

	// ✅ Update the favorite field in MongoDB
	_, err = collection.UpdateOne(
		c.Context(),
		bson.M{"_id": objectID},
		bson.M{"$set": bson.M{"favorite": body.Favorite}}, // Use the value sent from the frontend
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to update item")
	}

	// ✅ Return updated response
	return c.JSON(fiber.Map{"_id": _id, "favorite": body.Favorite})
}

func updateFurnitureInCart(c *fiber.Ctx) error {
	// Extract the item ID from the URL params
	itemID := c.Params("id")

	// Define the structure for the request body (inCart field)
	var updatedItem struct {
		InCart bool `json:"inCart"`
	}

	// Parse the request body
	if err := c.BodyParser(&updatedItem); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Convert itemID to MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(itemID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid item ID"})
	}

	// MongoDB filter to find the item by ObjectId
	filter := bson.M{"_id": objectID}

	// MongoDB update query to set the inCart field
	update := bson.M{"$set": bson.M{"inCart": updatedItem.InCart}}

	// Update the item in the database
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update the item"})
	}

	// Check if the item exists
	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Item not found"})
	}

	// Return success message
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Item updated successfully"})
}


