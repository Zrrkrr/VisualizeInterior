import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [
    { 
      id: 1,
      source: require("../assets/HomeImgs/Frame1.png"),
      title: "Modern Wall Design",
      description: "A beautifully curated modern wall décor setup featuring a series of arched niches, each elegantly framed and fitted with subtle backlit mirrors that create a soft, ambient radiance. The gentle illumination from the mirrors is complemented by warm, contemporary wall sconces placed strategically to enhance the depth and character of the space. Within the niches and around the setting, sophisticated gold planters overflow with cascading green plants, introducing vibrant, natural textures against the clean architectural lines. The warm metallic tones of the planters add a touch of luxury, while the greenery breathes life and freshness into the design. Together, the soft lighting, organic elements, and minimalist yet rich styling create a serene, inviting, and effortlessly sophisticated atmosphere."
    },
    { 
      id: 2,
      source: require("../assets/HomeImgs/Frame2.png"),
      title: "Modern Living Room",
      description: "A contemporary living room highlighted by a tall, textured accent wall with geometric paneling, bringing depth and sophistication to the space. The neutral-toned sectional sofa offers comfort and style, complemented by layered round coffee tables that create visual interest. A sleek vertical floor lamp adds a touch of modern elegance, while minimalist décor pieces keep the look clean and refined. Subtle lighting and natural elements, such as wood accents and greenery, infuse warmth and freshness, creating an inviting, stylish atmosphere that’s perfect for upscale urban interiors. The overall design balances form and function, offering both relaxation and visual appeal in equal measure."
    },
    { 
      id: 3,
      source: require("../assets/HomeImgs/Frame3.png"),
      title: "Modern Office Space",
      description: "A compact, modern office space designed for both functionality and style, featuring a clean white desk setup with a desktop computer and minimal accessories for a clutter-free environment. The background showcases textured wooden wall panels that add warmth, complemented by a geometric patterned board that brings a contemporary edge. A decorative Krishna statue subtly infuses the space with traditional elegance, creating a harmonious blend of modern and cultural elements. The overall design combines simplicity with practicality, crafting a professional yet serene workspace ideal for focused productivity."
    },
    { 
      id: 4,
      source: require("../assets/HomeImgs/Frame4.png"),
      title: "Modern Living Room",
      description: "A spacious, modern living room featuring an open staircase that gracefully leads to the upper floor, complemented by large floor-to-ceiling windows that bathe the space in natural sunlight. The design embraces minimalistic furniture with clean lines, accented by warm tones and airy aesthetics, creating an inviting and bright atmosphere. The room’s open layout promotes a sense of flow, while the thoughtful use of space and light makes it an ideal setting for contemporary living, blending comfort and sophistication effortlessly."
    },
    { 
      id: 5,
      source: require("../assets/HomeImgs/Frame5.png"),
      title: "Sunglasses Store",
      description: "A trendy sunglasses store designed with bold, vivid blue wall accents that add a dynamic touch to the space. Sleek, modern elements, including clean-lined displays and contemporary fixtures, create a sophisticated yet vibrant atmosphere. The energetic color palette is complemented by carefully placed lighting that enhances the products, showcasing the eyewear collections in an eye-catching way. The design promotes a stylish, welcoming environment, offering an engaging shopping experience that draws customers in while highlighting the latest trends in eyewear."
    },
    { 
      id: 6,
      source: require("../assets/HomeImgs/Frame6.png"),
      title: "Modern Living Room",
      description: "A chic, modern living room defined by clean lines and minimalist furniture, complemented by a neutral color palette that exudes calm and sophistication. Bold statement lighting serves as a focal point, elevating the space with its modern design. Large windows flood the room with natural light, amplifying the open and airy atmosphere. Subtle decor pieces, thoughtfully curated, add warmth and texture, creating a perfectly balanced and inviting contemporary space that feels both stylish and serene."
    },
    { 
      id: 7,
      source: require("../assets/HomeImgs/1.jpg"),
      title: "Elegant Living Room",
      description: "An elegant living room styled with opulent golden accents, featuring sophisticated furniture in soft neutral tones that exude timeless luxury. The golden elements, from lighting fixtures to decorative trims, introduce a glamorous touch, while warm ambient lighting creates a cozy, inviting atmosphere. Thoughtfully curated décor pieces, alongside the golden highlights, add depth and richness to the space, blending modern design with classic elegance for a truly refined setting."
    },
    { 
      id: 8,
      source: require("../assets/HomeImgs/2.jpg"),
      title: "Modern Bedroom",
      description: "A cozy, modern bedroom that effortlessly blends warm wooden textures with sleek, contemporary design elements. Natural wood panels add a rich, organic feel, while minimalist furniture maintains a clean and uncluttered aesthetic. Soft ambient lighting bathes the space in a soothing glow, enhancing the serene atmosphere. The design strikes the perfect balance between comfort and sophistication, creating a stylish retreat that invites relaxation and restful sleep."
    },
    { 
      id: 9,
      source: require("../assets/HomeImgs/3.jpg"),
      title: "Spacious Living Room",
      description: "A spacious living room featuring a large open balcony that seamlessly blends with the indoor space, offering a breathtaking view of a lush tree and the vibrant city skyline. The room is bathed in natural light, creating a warm and inviting atmosphere. Modern, minimalist wooden furniture in sleek white tones adds a touch of elegance and simplicity. A comfortable sofa, accent chairs, and a low-profile coffee table are arranged in a cozy yet stylish layout. Large glass windows allow for easy access to the balcony, perfect for enjoying the view or relaxing with a cup of coffee. The combination of natural greenery and urban landscape enhances the serene, modern vibe of the room."
    },
    { 
      id: 10,
      source: require("../assets/HomeImgs/4.jpg"),
      title: "Ambient LED Lighting",
      description: "Soft, warm white LED strips gracefully line the edges of the wall, extending seamlessly from the base to the ceiling, casting a gentle, ambient glow across the room. The subtle lighting creates a welcoming and cozy atmosphere, perfect for relaxation. The upward direction of the LED strips accentuates the room’s height, giving the space a modern, airy feel while maintaining a calming warmth that envelops the entire room. The warm white hue enhances the overall design, creating a harmonious blend of comfort and elegance."
    },
    { 
      id: 11,
      source: require("../assets/HomeImgs/5.jpg"),
      title: "Cozy Living Room",
      description: "The living room exudes a cozy, inviting atmosphere with a warm ambience, enhanced by soft, golden lighting that casts a gentle glow across the space. Olive green accents are tastefully incorporated throughout, from plush throw pillows on the sofa to subtle artwork on the walls, adding a touch of nature and tranquility. The warmth of the neutral-toned furniture pairs beautifully with the olive hues, creating a balanced and soothing aesthetic. The space feels both modern and timeless, perfect for relaxation or entertaining guests, with the olive accents bringing depth and a serene, earthy vibe to the room."
    },
    { 
      id: 12,
      source: require("../assets/HomeImgs/6.jpg"),
      title: "Modern Living Room with Library",
      description: "The living room features a sleek, modern design with clean lines and open spaces, illuminated by warm, soft lighting that creates a cozy yet contemporary atmosphere. A striking staircase leads up to a stylish library, seamlessly integrating the two spaces. The stairs, with their minimalist railing and smooth wooden steps, provide a focal point, drawing the eye upwards. Warm accents, such as rich wood finishes, textured throw blankets, and gold-toned light fixtures, add a touch of elegance. The living area is furnished with modern, comfortable seating and subtle, neutral tones, creating a space that’s both chic and inviting. The design invites relaxation while the library above offers a quiet retreat, perfectly complementing the room’s modern warmth."
    },
    { 
      id: 13,
      source: require("../assets/HomeImgs/7.jpg"),
      title: "Mandir",
      description: "A serene and sacred small Mandir, thoughtfully designed within the home, featuring a beautifully illuminated large Om symbol at the center, radiating peace and positivity. The Om, glowing warmly against a subtle backdrop, becomes the spiritual heart of the space. The Mandir is crafted with traditional Indian elements — intricate wooden carvings, soft golden lighting, and marble or wooden flooring — creating an atmosphere of devotion and tranquility. Small shelves or platforms hold idols, diyas, and incense, while the overall design remains minimal and elegant, allowing the illuminated Om to shine as the centerpiece, filling the home with a sense of calm and divine energy."
    },
    { 
      id: 14,
      source: require("../assets/HomeImgs/8.jpg"),
      title: "Cozy Living Room",
      description: "A spacious living room designed for comfort and elegance, featuring cozy warm accents that create a welcoming atmosphere. The soft beige sofa anchors the space, complemented perfectly by modern, flowing curtains in matching beige tones that add a sense of softness and sophistication. Natural light filters through the layered curtain styles, balancing privacy and brightness beautifully. Warm lighting, textured rugs, and subtle decorative elements like throw pillows and vases enhance the cozy, lived-in feel. The overall design blends modern simplicity with a warm, inviting charm, making the room perfect for both relaxation and gatherings."
    },
    { 
      id: 15,
      source: require("../assets/HomeImgs/9.jpg"),
      title: "Minimalist Living Room",
      description: "A minimalist living room that exudes warmth and elegance, featuring rich wooden flooring and a matching wooden ceiling that bring a natural, cohesive feel to the space. The design embraces clean lines, open space, and a neutral color palette, allowing the beauty of the wood textures to stand out. Simple, functional furniture pieces with soft, muted tones are carefully placed to maintain an uncluttered look. Subtle lighting, such as recessed fixtures or a sleek floor lamp, enhances the warm undertones of the wood, creating a serene and sophisticated environment that feels both modern and timeless."
    },
    { 
      id: 16,
      source: require("../assets/HomeImgs/10.jpg"),
      title: "Modern Kitchen",
      description: "A clean and minimal kitchen designed with a fresh, airy feel, featuring crisp white countertops that reflect the warm, soft lighting beautifully. Modern teal accents, seen in the cabinetry and subtle decor pieces, add a vibrant yet calming touch to the space. The layout is streamlined and functional, with sleek lines and uncluttered surfaces that emphasize simplicity and elegance. Warm lights under the cabinets and overhead fixtures create a cozy glow, highlighting the textures and colors without overwhelming the minimalist aesthetic. The combination of white and teal brings a perfect balance of brightness and character to the modern kitchen."
    },
    { 
      id: 17,
      source: require("../assets/HomeImgs/11.jpg"),
      title: "Mandir with Glass Walls",
      description: "A beautifully serene Mandir featuring clean, elegant wooden borders that frame the space with warmth and simplicity. The Mandir is enclosed by transparent glass walls, creating an open and airy feel while maintaining a sense of sacredness. The combination of natural wood tones and sleek glass gives the space a perfect balance of tradition and modernity. Soft, ambient lighting highlights the idols and sacred elements, while the minimalist design ensures the focus remains on devotion and peace. The Mandir feels light, pure, and inviting — a tranquil retreat within the home."
    },
    { 
      id: 18,
      source: require("../assets/HomeImgs/12.jpg"),
      title: "Bright Bedroom",
      description: "A bright and well-lit bedroom designed to feel fresh, open, and welcoming. Large windows allow plenty of natural light to flood the space, enhancing the soft, neutral tones of the walls and furnishings. Light, airy curtains frame the windows, adding to the sense of spaciousness without blocking the sunshine. Minimalistic furniture in subtle colors keeps the room uncluttered and serene. Warm ambient lighting from bedside lamps and ceiling fixtures ensures a cozy glow in the evenings, making the bedroom a perfect blend of energy during the day and comfort at night."
    }
  ]
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    // Add reducers if needed later
  }
});

export default imageSlice.reducer;