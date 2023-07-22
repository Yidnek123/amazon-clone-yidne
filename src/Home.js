import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="header__image"
					src="https://m.media-amazon.com/images/I/71rGgSBSmOL._SX3000_.jpg"
					alt=""
				/>

                <div className="home__row">
					<Product
					id="12321341"
            title="UNIIKA Dog Tags Engraved Pet Canada Stainless Steel ID Tags, Custom Personalized Dog Tags and Cat Tags, Deep Engraved on Both Sides (Large, Silver)"
            price={10.95}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/81FD4xo9tKL._AC_UL600_SR600,400_.jpg"
					/>
					<Product
					id="546746848"
            title="Everlasting Comfort Seat Cushion for Tailbone Pain Relief-Office Chair Cushion w/Premium ComfortFoam for All-Day Sitting Support-Coccyx, Sciatica Pain Relief Pillow for Desk Chair, Car Seat "
            price={57}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/81zvcEbHUhL._AC_UL600_SR600,400_.jpg"
					/>
                </div>
				<div className="home__row">
					<Product
					id="87456575"
            title="EcoNour Car Windshield Sun Shade with Storage Pouch | Front Window Sun Protector for UV Rays &amp; Sun Heat | Car Interior Accessories Fits Small Sedans, Mini SUVs and Hatchbacks | Standard (64x32 inches)" 
            price={1999.99}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/818oDYNoR2L._AC_UL600_SR600,400_.jpg"
					/>
					<Product
					  id="14654747"
            title="Echo Dot (3rd gen) - Smart speaker with Alexa - Charcoal "
            price={100.95}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/6182S7MYC2L._AC_UL600_SR600,400_.jpg" 
					/>
					<Product
					 id="16546346"
            title="Quntis Outdoor String Lights, Waterproof Shatterproof Outdoor Led Patio String Lights, Connectable Commercial Led String Lights Hanging for Gazebo Pergola Backyard Garden Bistro Cafe Deck Balcony Party Wedding Decoration, Warm White"
            price={110.95}
			rating={5}
			image="https://m.media-amazon.com/images/I/41yOuWKLWBL._AC_UF226,226_FMjpg_.jpg"
					
					/>
				</div>
				<div className="home__row">
					<Product
					  id="34543634"
            title="iRobot Robotic Vacuums"
            price={210.95}
			rating={5}
			image="https://m.media-amazon.com/images/I/311XaOb50tL._AC_UF226,226_FMjpg_.jpg"
					/>
				</div>
				<div className="home__row">
				<Product
					id="87456876"
            title="Wireless Earbuds, Bluetooth 5.3 Earbuds, ENC Call Noise Cancelling 4 Mics, HiFi Stereo with Dual 13mm Dynamic Drivers, IPX7 Waterproof in-Ear Headphones, 50H Playtime Mini Charging Case, Clear Call" 
            price={47.99}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/61CKgBPRyfL._AC_UL600_SR600,400_.jpg"
					/>
					<Product
					  id="14654456"
            title="2Pack Light Bulb Security Camera Outdoor,2.4G Wifi Light Socket Security Cameras 1080P,Security Wireless Security Camera Outdoor/Indoor,Color Night Vision,Twoway Dialogue,Motion Tracking,Cloud Storage"
            price={65.99}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/61M8AiyIQaL._AC_UL600_SR600,400_.jpg" 
					/>
					<Product
					 id="16546367"
            title="Penemay Dash Cam Front and Rear 4k WiFi,3 Inch Dash Camera for Cars with 1080P Rear Camera,Dual Dash Cam Included 64GB Micro SD Card,Dashboard Camera with Night Vision,Parking Monitor,Motion Detection"
            price={150.95}
			rating={5}
			image="https://images-na.ssl-images-amazon.com/images/I/71C7HMNix3L._AC_UL600_SR600,400_.jpg"
					
					/>
				
				</div>
			</div>
		</div>
	);
}

export default Home;


