-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 11:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dog _pharmacy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Fungal_infections', 'Conditions caused by fungal infections that affect the skin and other parts of the body. Examples include ringworm and athlete’s foot.', NULL),
(2, 'Hypersensitivity_allergic_dermatosis', 'Skin conditions caused by allergic reactions, including eczema and hives. These are often triggered by allergens or irritants.', NULL),
(3, 'Bacterial_dermatosis', 'Skin conditions caused by bacterial infections. Examples include impetigo and cellulitis. These conditions require antibiotic treatment.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `howtouse` text DEFAULT NULL,
  `expdate` date DEFAULT NULL,
  `mfd` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `image`, `description`, `howtouse`, `expdate`, `mfd`, `created_at`, `category_id`) VALUES
(1, 'Antiviral Cream', 300.00, '/items/Fungal1.png', 'Antiviral Cream is used to treat viral skin infections, such as cold sores and shingles. It helps to prevent the virus from spreading and promotes healing of the affected skin areas.', 'Apply the cream directly to the affected area 2-3 times daily, following the directions on the packaging.', '2025-12-31', '2024-01-15', NULL, 1),
(2, 'Anti-Aging Serum', 500.00, '/items/Fungal2.png', 'Anti-Aging Serum helps reduce the appearance of fine lines and wrinkles by hydrating and firming the skin, promoting a more youthful look over time.', 'Apply a few drops to your face and neck every morning and evening after cleansing. Massage gently until absorbed.', '2025-08-31', '2024-04-10', NULL, 1),
(3, 'Sunscreen SPF 50', 250.00, '/items/Fungal3.png', 'Sunscreen SPF 50 provides broad-spectrum protection against both UVA and UVB rays, helping to prevent sunburn and skin damage.', 'Apply generously to all exposed skin at least 30 minutes before going outdoors. Reapply every 2 hours or after swimming or sweating.', '2025-09-15', '2024-05-05', NULL, 1),
(4, 'Wound Healing Ointment', 220.00, '/items/Fungal4.png', 'Wound Healing Ointment aids in the healing of minor cuts, scrapes, and burns by forming a protective barrier and moisturizing the skin to promote faster healing.', 'Apply to the wound 2-3 times daily, making sure the area is clean before each application.', '2024-12-31', '2023-10-15', NULL, 1),
(5, 'Antifungal Powder', 180.00, '/items/Fungal5.png', 'Antifungal Powder helps prevent and treat fungal infections such as athlete’s foot and jock itch. It absorbs moisture and reduces friction, creating an environment that inhibits fungal growth.', 'Use twice daily on the affected area after washing and drying the skin thoroughly. Continue use for 2 weeks after symptoms disappear to prevent recurrence.', '2025-01-10', '2024-02-12', NULL, 1),
(6, 'Ringworm Cream', 190.00, '/items/Fungal6.png', 'Ringworm Cream effectively treats fungal infections such as ringworm, jock itch, and athlete’s foot by eliminating the fungi causing the infection.', 'Apply the cream to the affected area twice daily for at least 4 weeks, even if symptoms disappear earlier.', '2025-03-10', '2024-01-20', NULL, 1),
(7, 'Nail Fungus Treatment', 400.00, '/items/Fungal7.png', 'Nail Fungus Treatment is formulated to treat fungal infections of the nails, promoting healthier nails and preventing the infection from spreading.', 'Apply daily to affected nails and surrounding skin for several months until healthy nails replace the infected ones.', '2025-11-20', '2024-05-15', NULL, 1),
(8, 'Yeast Infection Cream', 280.00, '/items/Fungal8.png', 'Yeast Infection Cream is designed to treat vaginal yeast infections by relieving itching, burning, and irritation while eliminating the yeast that causes the infection.', 'Apply the cream once daily for 7 days, following the instructions provided by your healthcare provider.', '2025-02-25', '2024-03-05', NULL, 1),
(9, 'Tinea Versicolor Lotion', 210.00, '/items/Fungal9.png', 'Tinea Versicolor Lotion helps to treat fungal skin conditions like tinea versicolor, which causes patches of discolored skin. It works by stopping the growth of the fungus.', 'Apply daily for 2 weeks, covering the affected area with a thin layer of lotion. Continue treatment until the discoloration fades.', '2025-06-15', '2024-04-20', NULL, 1),
(10, 'Scalp Fungal Shampoo', 230.00, '/items/Fungal10.png', 'Scalp Fungal Shampoo cleanses the scalp and treats fungal infections such as dandruff and seborrheic dermatitis, leaving your scalp healthy and free from itching and flaking.', 'Use 2-3 times a week, massaging the shampoo into wet hair and scalp. Leave on for 5 minutes before rinsing thoroughly.', '2025-04-30', '2024-05-15', NULL, 1),
(11, 'Pain Relief Gel', 150.00, '/items/Hyper1.png', 'Pain Relief Gel provides temporary relief from muscle pain, joint aches, and stiffness. It is ideal for use after exercise or physical activity to soothe sore muscles.', 'Apply the gel to the affected area and gently massage until fully absorbed. Use up to 4 times daily for best results.', '2024-12-31', '2023-11-01', NULL, 2),
(12, 'Acne Treatment Cream', 180.00, '/items/Hyper2.png', 'Acne Treatment Cream helps to reduce acne lesions and prevent new breakouts by targeting the bacteria that cause acne. It also helps reduce inflammation and redness.', 'Apply the cream directly to acne-prone areas 1-2 times daily after cleansing. Continue using regularly for clearer skin.', '2024-11-30', '2023-09-01', NULL, 2),
(13, 'Eczema Relief Cream', 270.00, '/items/Hyper3.png', 'Eczema Relief Cream provides soothing relief for dry, itchy, and irritated skin caused by eczema. It helps restore the skin\'s moisture barrier and reduce inflammation.', 'Apply the cream to the affected areas as needed for relief from eczema symptoms. Use regularly to prevent flare-ups.', '2025-01-31', '2024-03-01', NULL, 2),
(14, 'Allergy Soothing Lotion', 240.00, '/items/Hyper4.png', 'Allergy Soothing Lotion helps relieve skin itching, irritation, and redness caused by allergic reactions. It is gentle on sensitive skin and helps calm irritation quickly.', 'Apply the lotion twice daily to the affected areas. For best results, use after bathing or as needed when symptoms arise.', '2025-04-20', '2024-02-10', NULL, 2),
(15, 'Contact Dermatitis Cream', 260.00, '/items/Hyper5.png', 'Contact Dermatitis Cream is designed to treat symptoms of contact dermatitis, such as redness, itching, and swelling caused by skin contact with irritants or allergens.', 'Apply the cream to irritated skin as needed. Reapply up to 4 times daily or as directed by a healthcare provider.', '2024-10-30', '2023-09-15', NULL, 2),
(16, 'Hives Relief Ointment', 290.00, '/items/Hyper6.png', 'Hives Relief Ointment helps reduce the itching, swelling, and discomfort caused by hives. It works quickly to soothe skin and reduce inflammation.', 'Apply 2-3 times daily to the affected areas for relief from hives. Continue using until symptoms subside.', '2025-05-25', '2024-03-10', NULL, 2),
(17, 'Psoriasis Cream', 320.00, '/items/Hyper7.png', 'Psoriasis Cream is formulated to relieve the symptoms of psoriasis, including redness, flaking, and scaling. It helps restore the skin\'s appearance and soothe irritation.', 'Apply daily to affected areas of the skin. For best results, use consistently to manage psoriasis symptoms.', '2025-08-30', '2024-06-15', NULL, 2),
(18, 'Urticaria Gel', 170.00, '/items/Hyper8.png', 'Urticaria Gel helps to relieve the itching and discomfort associated with urticaria (hives). It cools and soothes irritated skin and reduces redness.', 'Apply generously to the affected area and massage gently. Use as often as needed for relief.', '2025-07-10', '2024-04-25', NULL, 2),
(19, 'Steroid Cream', 400.00, '/items/Hyper9.png', 'Steroid Cream is a potent anti-inflammatory cream used to reduce swelling, redness, and itching caused by severe allergic reactions or skin conditions.', 'Apply a thin layer of the cream to the affected skin once or twice daily. Do not use for more than 2 weeks without medical supervision.', '2025-09-20', '2024-07-30', NULL, 2),
(20, 'Angioedema Ointment', 200.00, '/items/Hyper10.png', 'Angioedema Ointment is used to treat swelling of the deeper layers of the skin caused by angioedema. It helps reduce swelling and discomfort.', 'Apply the ointment 1-2 times daily to the affected areas. Continue using until the swelling subsides.', '2024-11-10', '2023-10-20', NULL, 2),
(21, 'Moisturizing Lotion', 200.00, '/items/Bacterial1.png', 'Moisturizing Lotion keeps the skin hydrated, soft, and smooth throughout the day. It helps maintain the skin\'s natural moisture barrier, preventing dryness and irritation.', 'Apply the lotion generously all over the body after bathing or whenever skin feels dry. For best results, use daily.', '2025-06-30', '2024-02-15', NULL, 3),
(22, 'Bacterial Skin Ointment', 250.00, '/items/Bacterial2.png', 'Bacterial Skin Ointment effectively treats bacterial skin infections such as impetigo. It helps kill bacteria and promote faster healing of the infected area.', 'Apply the ointment to the affected area 2-3 times daily until the infection is fully cleared. Continue for a few days after symptoms subside to prevent recurrence.', '2024-10-20', '2023-08-15', NULL, 3),
(23, 'Folliculitis Gel', 230.00, '/items/Bacterial3.png', 'Folliculitis Gel helps to treat inflamed hair follicles caused by bacterial infection or irritation. It soothes the skin and reduces inflammation and discomfort.', 'Apply the gel daily to the inflamed areas for fast relief. Continue use until the inflammation subsides.', '2025-05-10', '2024-03-01', NULL, 3),
(24, 'Impetigo Cream', 210.00, '/items/Bacterial4.png', 'Impetigo Cream is specifically formulated to treat impetigo and other bacterial skin infections. It helps to kill the bacteria causing the infection and promotes healing.', 'Apply the cream to the affected areas 2-3 times daily. Use regularly until the infection clears completely.', '2025-07-20', '2024-04-15', NULL, 3),
(25, 'Cellulitis Ointment', 290.00, '/items/Bacterial5.png', 'Cellulitis Ointment effectively treats bacterial skin infections like cellulitis, reducing inflammation and preventing the spread of infection.', 'Apply the ointment to the affected area 2-3 times a day. Continue use for the duration of the prescribed treatment period.', '2024-09-30', '2023-06-01', NULL, 3),
(26, 'Carbuncle Treatment Gel', 270.00, '/items/Bacterial6.png', 'Carbuncle Treatment Gel is designed to treat deep skin infections like carbuncles. It helps reduce pain, inflammation, and the spread of infection.', 'Apply the gel to the affected area once daily. For deep infections, consult with a healthcare provider for further advice.', '2025-03-20', '2024-01-25', NULL, 3),
(27, 'Boil Relief Cream', 220.00, '/items/Bacterial7.png', 'Boil Relief Cream relieves pain and treats boils, helping to drain pus and reduce inflammation for faster healing.', 'Apply the cream to the boil 2-3 times daily until the boil heals. Cover with a sterile bandage if necessary.', '2025-02-15', '2023-11-20', NULL, 3),
(28, 'Erysipelas Treatment Ointment', 300.00, '/items/Bacterial8.png', 'Erysipelas Treatment Ointment is designed to treat bacterial infections like erysipelas, reducing redness, swelling, and pain associated with the infection.', 'Apply the ointment to the infected areas once daily. Continue use as directed by a healthcare provider.', '2025-08-10', '2024-06-05', NULL, 3),
(29, 'Pustular Dermatosis Gel', 260.00, '/items/Bacterial9.png', 'Pustular Dermatosis Gel helps reduce pus-filled lesions caused by bacterial infections. It soothes the skin and promotes healing while reducing inflammation.', 'Apply the gel to the affected skin once daily. Use regularly until the lesions heal.', '2024-12-30', '2023-07-25', NULL, 3),
(30, 'Staphylococcal Skin Cream', 290.00, '/items/Bacterial10.png', 'Staphylococcal Skin Cream treats skin infections caused by Staphylococcus bacteria. It helps reduce inflammation, itching, and redness while promoting healing.', 'Apply the cream 2-3 times daily to the infected area. Continue use until the infection is fully resolved.', '2025-11-05', '2024-02-10', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_price` decimal(10,2) NOT NULL,
  `item_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `order_id`, `item_name`, `item_price`, `item_quantity`) VALUES
(1, 1, 'Product Name', 100.00, 1),
(2, 2, 'Moisturizing Lotion', 200.00, 3),
(3, 3, 'Antiviral Cream', 300.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `delivery_option` enum('pickup','delivery') NOT NULL,
  `payment_option` enum('card','cash') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','rejected') DEFAULT 'pending',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `first_name`, `last_name`, `username`, `address`, `phone_number`, `email`, `delivery_option`, `payment_option`, `total_amount`, `status`, `created_at`) VALUES
(1, 'Showan', 'Premakumar', 'malith23', 'RIVER BANK,', '0724392274', 'Shonkandy@gmail.com', 'pickup', 'card', 100.00, 'rejected', '2024-09-11 21:15:56'),
(2, 'Thushini', 'Dissanayake', 'malith23', 'beliatta', '0748596358', 'lghmalith44@gmail.com', 'pickup', 'card', 600.00, 'confirmed', '2024-09-11 21:31:16'),
(3, 'Thushini', 'Dissanayake', 'user3', 'beliatta', '0748596358', 'lghmalith44@gmail.com', 'pickup', 'cash', 300.00, 'confirmed', '2024-09-11 23:02:04');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `reservation_date` datetime NOT NULL,
  `num_of_people` int(11) NOT NULL,
  `service_type` enum('breakfast','dinner','lunch') NOT NULL,
  `status` enum('pending','confirmed','rejected') DEFAULT 'pending',
  `remark` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `phone_number`, `address`, `role`, `status`, `created_at`) VALUES
(2, 'user1', '$2a$10$/HKfa5hkhvEuaP3RnaNv/Oe1vfHpZ9ANB4BYtf3cIipdw7MyXQbsm', 'Shonkandy@gmail.com', 'Showan', 'Premakumar', '0724392274', 'RIVER BANK,', 'user', 1, '2024-09-11 19:13:36'),
(3, 'user3', '$2a$10$haZ4OHc2wDPcanEMIRD7sujDpLbbqvE6Fce0VW18d24AmYBmqNyra', 'lghmalith44@gmail.com', 'Thushini', 'Dissanayake', '0748596358', 'beliatta', 'admin', 1, '2024-09-11 19:34:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
