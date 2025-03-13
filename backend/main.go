package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
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
}

var collection *mongo.Collection

func main() {

	fmt.Println("hello world")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error Loading .env file:", err)
	}

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

	collection = client.Database("golang_db").Collection("furniture")

	app := fiber.New()

	app.Get("/api/furniture", getFurniture)
	// app.Post("/api/furniture/favorite", postFavorite)


	port := os.Getenv("PORT")
	if port == ""{
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

// func postFavorite(c *fiber.Ctx)error{

// }