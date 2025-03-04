package main

import (
	"github.com/gin-gonic/gin"
)

type Furniture struct{
	ID     string  `json:"id"`
	Name   string `josn:"name"`
	Description string `josn:"description"`
	Price float64 `josn:"price"`
}



func main() {
	router := gin.Default()
	router.Get("/api/furniture", getFurniture)
	// app.Post("/api/todos", createTodo)
	// app.Patch("/api/todos/:id", updateTodo)
	// app.Delete("/api/todos/:id", getFurniture)

	router.Run(":8080")
}