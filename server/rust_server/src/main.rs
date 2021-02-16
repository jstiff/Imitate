use futures::future::TryFutureExt;
use tokio::sync::oneshot;
use warp::Filter;

// #[tokio::main]
// async fn main() {
//     let routes = warp::any().map(|| "Hello, World!");

//     let (tx, rx) = oneshot::channel();

//     let (addr, server) =
//         warp::serve(routes).bind_with_graceful_shutdown(([127, 0, 0, 1], 3030), async {
//             rx.await.ok();
//         });

//     // Spawn the server into a runtime
//     tokio::task::spawn(server);

//     // Later, start the shutdown...
//     let _ = tx.send(());
// }

#[tokio::main]

// need 1. 'userouter'
//      2. 'github router'
// .    3. json & urlencoded body parser.
//      4. dotenv config
//      5. 'passport' equivalent
//      6. 
async fn main() {
    let hello_world = warp::path::end().map(|| "The root page!");
    // GET /hello/warp => 200 OK with body "Hello, warp!"
    let hello_from_warp =
        warp::path!("hello" / String).map(|name| format!("Hello from WARP, {}!", name));

    let routes = 
    warp::get().and(hello_world.or(hello_from_warp));

    warp::serve(routes).run(([127, 0, 0, 1], 3000)).await;
    println!("Listening");
}

