use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use tokio::fs;

#[get("/")]
async fn greet() -> impl Responder {
    HttpResponse::Ok().body("Hello this is code from Rust!")
}

#[get("/health/readiness")]
async fn readiness() -> impl Responder {
    match fs::metadata("/tmp/ready").await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/health/liveness")]
async fn liveness() -> impl Responder {
    match fs::metadata("/tmp/ready").await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(greet)
            .service(readiness)
            .service(liveness)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
