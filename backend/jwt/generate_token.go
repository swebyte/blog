package main

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func loadSecret() string {
	// Read the secret from the file
	secret, err := os.ReadFile("secret.key")
	if err != nil {
		panic(err)
	}
	return string(secret)
}

func generateToken(secret string) string {
	// Create the token with the provided payload
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"role": "authenticated",
		"exp":  time.Now().Add(8 * time.Hour).Unix(), // Expiration timestamp set to 8 hours from now
	})

	// Sign the token with the secret key
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		panic(err)
	}
	return tokenString
}

func main() {
	// Load the secret key
	secret := loadSecret()

	// Generate a JWT token
	token := generateToken(secret)
	fmt.Println("Generated Token:", token)
}