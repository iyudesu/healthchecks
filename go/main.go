package main

import (
	"log"
	"net/http"
	"os"
)

func greetHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello this is code from Go!"))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	if _, err := os.Stat("/tmp/ready"); err == nil {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", greetHandler)
	http.HandleFunc("/health/readiness", healthCheckHandler)
	http.HandleFunc("/health/liveness", healthCheckHandler)

	log.Println("Server is running on port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
