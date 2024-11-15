<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: https://logicpulsepro.us/auth/login');
    exit();
}

include '../partials/db.php';

// Set date and time variables
$today = date('Y-m-d');
$todays = date('Y-m-d');

// Prepare user role and information query
$stmt_role = $conn->prepare("SELECT id, role, domain, username FROM users WHERE user_id = ?");
$stmt_role->bind_param("s", $_SESSION['user_id']);
$stmt_role->execute();
$result_role = $stmt_role->get_result();

if (!$result_role) {
    die("Error in SQL query: " . $conn->error);
}

if ($result_role->num_rows > 0) {
    $user = $result_role->fetch_assoc();
    echo $id = $user['id'];
    $role = $user['role'];
    $domain = $user['domain'];
    $username = $user['username'];
    $manager_name = $user['username'];
    $current_username = $user['username'];
} else {
    die("User not found");
}

// Define the SQL queries for rejected conversions
if ($role == "admin") {
    $today_rejected_conversions_query = "SELECT * FROM conversions WHERE received_time >= '$today' AND status = 'rejected'";
} elseif ($role == "sub-admin") {
    $today_rejected_conversions_query = "SELECT * FROM conversions WHERE (manager_name = '$manager_name' OR User = '$manager_name') AND received_time >= '$today' AND status = 'rejected'";
} else {
    $today_rejected_conversions_query = "SELECT * FROM conversions WHERE user = '$username' AND received_time >= '$today' AND status = 'rejected'";
}

$today_rejected_conversions_result = $conn->query($today_rejected_conversions_query);

// Fetch the results for rejected conversions
$today_rejected_conversions_count = $today_rejected_conversions_result->num_rows;

// Fetch offers based on user role
if ($role == 'admin') {
    // Admin role: fetch all offers without LIMIT
    $sql = "SELECT * FROM offers ORDER BY FIELD(status, 'Active', 'Pause', 'Inactive')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        die("Error in SQL query: " . $conn->error);
    }
} else {
    // Non-admin roles: Fetch offers based on the user's unique ID in the offer_user table
    $offer_user_query = "SELECT offer_unique_ids FROM offer_user WHERE user_unique_id = ?";
    $stmt_offer_user = $conn->prepare($offer_user_query);
    $stmt_offer_user->bind_param("s", $id);
    $stmt_offer_user->execute();
    $offer_user_result = $stmt_offer_user->get_result();

    $offerUniqueIds = [];
    if ($offer_user_result->num_rows > 0) {
        $offer_user_row = $offer_user_result->fetch_assoc();
        $offerUniqueIds = explode(',', $offer_user_row['offer_unique_ids']);
    }

    if (!empty($offerUniqueIds)) {
        // Prepare placeholders for the offer IDs
        $placeholders = implode(',', array_fill(0, count($offerUniqueIds), '?'));
        $sql = "SELECT * FROM offers WHERE unique_id IN ($placeholders) ORDER BY FIELD(status, 'Active', 'Pause', 'Inactive')";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(str_repeat('s', count($offerUniqueIds)), ...$offerUniqueIds);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result) {
            die("Error in SQL query: " . $conn->error);
        }
    } else {
        // No offers found for this user
        $result = null;
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/tailwind.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../style.css">
    <title> Offers | L o g i c P u l s e™
    </title>
    <link rel="icon" type="image/x-icon" href="https://www.datingdesire.pro/assets/images/favicon.png">
    <style>
        @media (min-width: 1024px) {

            .cgd {
                margin-left: 14rem;
            }
        }

        td,
        tr {
            border: transparent !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2) !important;
            color: gray !important;
        }

        .main {
            gap: 6px;
        }

        .d-m-left {
            min-width: 40%;
        }

        .d-m-right {
            min-width: 60%;
        }

        .d-m-right input {
            max-width: 300px;
        }

        input:focus {
            outline: none !important;
            border: none;
        }

        .d-m-right label {
            min-width: 100px;
        }

        @media(max-width: 600px) {
            .cards-container {
                flex-direction: column !important;
                gap: 7px;
            }
        }

        @media(max-width: 800px) {

            .main {
                display: flex;
                flex-direction: column;
            }

            .d-m-left {
                min-width: 100%;
            }

            .d-m-right {
                min-width: 100%;
            }

            .d-m-right input {
                max-width: 100%;
            }

            .d-m-right label {
                max-width: 50px !important;
            }


        }
    </style>
</head>

<body class="bg-gray-50 dark:bg-gray-800">
    <nav class="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <?php include '../partials/navbar.php'; ?>
    </nav>
    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">

        <aside id="sidebar"
            class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0  h-full pt-16 font-normal duration-75 lg:flex transition-width"
            aria-label="Sidebar" style="width: 14rem;">
            <?php include '../partials/aside.php'; ?>

        </aside>

        <div class="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 hidden" id="sidebarBackdrop"></div>

        <div id="main-content" class="relative w-full h-full overflow-y-auto cgd dark:bg-gray-900">
            <main>
                <div class="cards bg-gray-50 dark:bg-gray-900 mx-auto">

                    <div class="p-2 mt-2 bg-white border border-gray-100 dark:border-gray-800 sm:p-4 dark:bg-gray-800">
                        <!-- Card header -->
                        <div class="items-center md:justify-between md:flex">
                            <div class="p-2">
                                <div class="flex-1 flex justify-center items-center space-x-2">

                                </div>
                            </div>
                            <?php if ($role == 'admin') {
                                echo '<div class="items-center sm:flex w-100">
                                <div class="flex items-center  w-100">
                                    <a href="https://logicpulsepro.us/offers/create" class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        Create New
                                    </a >
                                </div>
                            </div>';
                            }
                            ?>
                        </div>
                        <!-- Table -->
                        <div class="flex flex-col mt-6">
                            <div class="overflow-x-auto ">
                                <div class="inline-block min-w-full align-middle">
                                    <div class="overflow-hidden shadow">
                                        <table class=" min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                            <thead class="bg-gray-50 dark:bg-gray-900 py-3">
                                                <tr class="">
                                                    <th scope="col"
                                                        class="p-2 font-medium  text-left text-gray-500  dark:text-white">
                                                        #
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Offer Name
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Clicks
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Con
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Rate/Con
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Amount
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Link
                                                    </th>
                                                    <th scope="col"
                                                        class="p-2 text-left text-gray-500  dark:text-white">
                                                        Status
                                                    </th>
                                                    <?php if ($role == 'admin'): ?>

                                                        <th scope="col"
                                                            class="p-2 text-left text-gray-500  dark:text-white">
                                                            Action
                                                        </th>
                                                    <?php endif; ?>

                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-gray-800">
                                                <?php
                                                $i = 1; // Initialize a counter
                                                $total_clicks = 0;
                                                $total_conversions = 0;
                                                $total_amount = 0;
                                                if ($result && $result->num_rows > 0) {
                                                    while ($offer = $result->fetch_assoc()) {
                                                        $offer_name = $offer['offer_name'];

                                                        // Get click count
                                                        if ($role == 'admin') {
                                                            $click_count_query = "SELECT COUNT(*) as count FROM click_data WHERE offer_name = '$offer_name' AND DateTime >= '$todays'";
                                                            $conversion_count_query = "SELECT COUNT(*) as count FROM conversions WHERE offer_name = '$offer_name' AND received_time >= '$todays' AND status = 'Approved'";
                                                        } elseif ($role == 'sub-admin') {
                                                            $click_count_query = "SELECT COUNT(*) as count FROM click_data WHERE (manager_name = '$manager_name' OR User = '$manager_name') AND offer_name = '$offer_name' AND DateTime >= '$todays'";
                                                            $conversion_count_query = "SELECT COUNT(*) as count FROM conversions WHERE (manager_name = '$manager_name' OR User = '$manager_name') AND offer_name = '$offer_name' AND received_time >= '$todays' AND status = 'Approved'";
                                                        } else {
                                                            $click_count_query = "SELECT COUNT(*) as count FROM click_data WHERE User = '$current_username' AND offer_name = '$offer_name' AND DateTime >= '$todays'";
                                                            $conversion_count_query = "SELECT COUNT(*) as count FROM conversions WHERE User = '$current_username' AND offer_name = '$offer_name' AND received_time >= '$todays' AND status = 'Approved'";
                                                        }

                                                        $click_count_result = $conn->query($click_count_query);
                                                        $click_count = $click_count_result->fetch_assoc()['count'];

                                                        $conversion_count_result = $conn->query($conversion_count_query);
                                                        $conversion_count = $conversion_count_result->fetch_assoc()['count'];
                                                        if (!$click_count_result) {
                                                            die('Error in click_count_query: ' . $conn->error);
                                                        }

                                                        if (!$conversion_count_result) {
                                                            die('Error in conversion_count_query: ' . $conn->error);
                                                        }

                                                        $countries = explode(',', $offer['countries']);
                                                        $limitedCountries = array_slice($countries, 0, 9);

                                                        $total_clicks += $click_count;
                                                        $total_conversions += $conversion_count;
                                                        $total_amount += ($conversion_count * $offer['rate']);

                                                        // Fetch network parameters based on network name
                                                        $network_name = $offer['network_name'];
                                                        $stmt_network = $conn->prepare("SELECT * FROM networks WHERE network_name = ?");
                                                        $stmt_network->bind_param("s", $network_name);
                                                        $stmt_network->execute();
                                                        $result_network = $stmt_network->get_result();

                                                        if (!$result_network) {
                                                            die("Error in SQL query: " . $conn->error);
                                                        }

                                                        if ($result_network->num_rows > 0) {
                                                            $network = $result_network->fetch_assoc();
                                                        }
                                                        ?>
                                                        <tr
                                                            class="hover:bg-gray-100 dark:hover:bg-gray-700 text-xl text-gray-700 font-medium">
                                                            <td class="p-2 text-sm font-normal text-gray-900 dark:text-white">
                                                                <?php echo $offer['id']; ?>
                                                            </td>
                                                            <td
                                                                class="offer-name p-2 text-sm cursor-pointer font-normal text-gray-900 dark:text-white td">
                                                                <a onclick="showOfferDetails('<?php echo $offer['id']; ?>', '<?php echo $_SESSION['user_id']; ?>', '<?php echo $network['network_value']; ?>', '<?php echo $domain; ?>')"
                                                                    data-drawer-target="drawer-disabled-backdrop"
                                                                    data-drawer-show="drawer-disabled-backdrop"
                                                                    data-drawer-backdrop="false"
                                                                    aria-controls="drawer-disabled-backdrop">
                                                                    <?php echo $offer['offer_name']; ?>
                                                                    <?php foreach ($limitedCountries as $country): ?>
                                                                        <?php echo $country; ?>,
                                                                    <?php endforeach; ?>
                                                                </a>
                                                            </td>
                                                            <td
                                                                class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                <?php echo $click_count ?>
                                                            </td>
                                                            <td
                                                                class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                <?php echo $conversion_count ?>
                                                            </td>
                                                            <td
                                                                class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                <?php echo $offer['rate']; ?>
                                                            </td>
                                                            <td
                                                                class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                <?php echo $conversion_count * $offer['rate']; ?>
                                                            </td>
                                                            <td
                                                                class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                <input type="text"
                                                                    value="<?php echo $domain; ?>/V/?p=<?php echo $id; ?>&o=<?php echo $offer['id']; ?>"
                                                                    class="block w-100 p-4 text-gray-900 bg-gray-50 sm:text-md dark:bg-gray-700 dark:text-gray-300 "
                                                                    onclick="this.select()" readonly>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <span
                                                                    class="bg-green-400 text-white text-base font-medium mr-2 px-2.5 py-0.5 rounded">
                                                                    <?php echo $offer['status']; ?>
                                                                </span>
                                                            </td>
                                                            <?php if ($role == 'admin'): ?>
                                                                <td class="px-2 py-2 text-xs font-medium whitespace-nowrap">
                                                                    <button id="drop-down-<?php echo $offer['id']; ?>"
                                                                        data-dropdown-toggle="drop-downs-<?php echo $offer['id']; ?>"
                                                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                                        type="button">
                                                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                                            viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                        </svg>
                                                                    </button>
                                                                    <div id="drop-downs-<?php echo $offer['id']; ?>"
                                                                        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                            aria-labelledby="drop-down-<?php echo $offer['id']; ?>">
                                                                            <li>
                                                                                <a href="edit-offer?oid=<?php echo $offer['id']; ?>"
                                                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                            </li>
                                                                        </ul>
                                                                        <div class="py-1">
                                                                            <a href="#"
                                                                                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                onclick="confirmDelete(<?php echo $offer['id']; ?>)">Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            <?php endif; ?>
                                                        </tr> <?php
                                                        $i++;
                                                    }
                                                } else {
                                                    echo '<tr ><td colspan="12">No data Found</td><tr/>';
                                                }
                                                ?>
                                                <tr
                                                    class="hover:bg-gray-100 dark:hover:bg-gray-700 text-xl text-gray-700 font-medium">
                                                    <td class="p-2 text-sm font-bold text-gray-900 dark:text-white">
                                                        Total
                                                    </td>
                                                    <td
                                                        class="p-2 text-sm cursor-pointer font-normal text-gray-900 dark:text-white td">
                                                    </td>
                                                    <td class="p-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                                                        <?php echo $total_clicks ?>
                                                    </td>
                                                    <td class="p-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                                                        <?php echo $total_conversions ?>
                                                    </td>
                                                    <td class="p-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                                                    </td>
                                                    <td
                                                        class="p-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <?php echo $total_amount ?>
                                                    </td>
                                                    <td class="p-2 text-sm font-bold whitespace-nowrap text-red-600 dark:text-red-600 "
                                                        style="
                          color: red !important;
                          ">
                                                        Today Rejected conversions.
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap text-red-600 dark:text-red-600"
                                                        style="
                          color: red !important;
                          ">
                                                        <?php echo $today_rejected_conversions_count ?>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <?php include '../partials/footer.php'; ?>
        </div>
    </div>
    <div id="drawer-disabled-backdrop"
        class="shadow-lg fixed top-0 left-0 right-0 z-40 w-full p-4 sm-p-2 transition-transform -translate-y-full bg-gray-50 dark:bg-gray-900"
        tabindex="-1" aria-labelledby="drawer-disabled-backdrop-label"
        style="max-height: calc(100vh - 8rem); overflow-y: auto;">
        <div class="mb-1">
            <h5 id="drawer-disabled-backdrop-label"
                class="text-base font-semibold text-gray-500 dark:text-gray-400 husername">
                Menu</h5>
            <button type="button" data-drawer-hide="drawer-disabled-backdrop" aria-controls="drawer-disabled-backdrop"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close menu</span>
            </button>
        </div>
        <hr class="border dark:border-gray-800">
        <div
            class="main w-full bg-white border border-gray-200 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-row mt-2">
            <div class="d-m-left px-2 ">
                <div class="offer">
                    <h2 class="inline-flex items-center text-base font-semibold text-gray-600 dark:text-gray-400">Allowd
                        Countries</h2>
                    <p class="max-w-sm mb-2 text-sm text-gray-500 dark:text-gray-400"><i class="countries"
                            style="overflow-wrap: break-word;"></i></p>
                </div>
                <div class="network">
                    <h3 class="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
                        Network</h3>
                    <p>
                        <span
                            class="text-white text-xs font-medium mr-2 px-2.5 py-0.5 shadow dark:bg-gray-700 dark:text-white border border-green-400 network-name"
                            style="background-color:lightseagreen;"><i></i></span>
                    </p>
                </div>
            </div>
            <div class="d-m-right my-2 min-w-lg py-3">
                <div class="">
                    <div class="space-y-4 h-full md:space-y-6">
                        <div class="flex gap-2">
                            <label for="network-name"
                                class="whitespace-nowrap block text-sm font-medium text-gray-900 dark:text-white mr-3 mt-3">Traking
                                url</label>
                            <input type="text"
                                class="url bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                onclick="this.select()" readonly>
                        </div>
                        <div class="flex gap-2">
                            <label for="netwok-parameter"
                                class="whitespace-nowrap block text-sm font-medium text-gray-900 dark:text-white mr-3 mt-3">Allowed
                                Devices<span class="text-red-500 text-">*</span></label>
                            <input type="text"
                                class="devices bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                readonly>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex justify-between">
                                <strong>Last Update</strong>
                                <span
                                    class="bg-red text-black text-sm font-medium ml-6 px-3 rounded-0 dark:bg-blue-900 dark:text-white last-update">01/01/2023</span>
                            </div>
                            <?php if ($role == 'admin'): ?>
                                <a href="#"
                                    class="text-white text-xs font-semibold mr-2 px-2.5 py-0.5   dark:text-white border border-green-400 shadow editbtn"
                                    style="background-color: #1ABB9C;"><i>Edit</i></a>
                            <? endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php if ($role == 'admin'): ?>
            <div
                class="main w-full bg-white border border-gray-200 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 mt-2">
                <div class="mb-1">
                    <h5 class=" text-gray-700 dark:text-gray-400 text-lg">Offer postback URL</h5>
                </div>
                <hr class="border mb-3 dark:border-gray-800">
                <div class="my-3 mb-2">
                    <label for="name" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Postback URL
                        <span class="text-red-500 text-">*</span></label>
                    <input type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 postbackUrl"
                        onclick="this.select()" readonly>
                </div>
                <div>
                    <label for="name" class="block mb-2  text-sm font-bold text-red-500 dark:text-white">Rejected Postback
                        URL
                        <span class="text-red-500 text-">*</span></label>
                    <input type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 postbackRejectedUrl"
                        onclick="this.select()" readonly>
                </div>
            </div>
        <? endif; ?>
    </div>
    <div id="toast-danger"
        class="hidden items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800"
        role="alert" style="
    position: fixed;
    top: 20px;
    z-index: 10000000000;
    right: 10px;">
        <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item has been deleted.</div>
        <button type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-danger" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const buttons = document.querySelectorAll('[data-action]');

            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const action = this.dataset.action;
                    const id = this.dataset.id;

                    // Send an AJAX request
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'action.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                // Handle the response if needed
                                // Check if the response indicates a successful delete
                                if (xhr.responseText === 'Record deleted successfully') {
                                    // Show the toast
                                    const toastElement = document.getElementById('toast-danger');
                                    toastElement.classList.remove('hidden');

                                    // Reload the page after three seconds
                                    setTimeout(function () {
                                        location.reload();
                                    }, 3000);
                                }
                            } else {
                                // Handle any errors
                                console.error('Error:', xhr.status);
                            }
                        }
                    };
                    xhr.send(`action=${action}&id=${id}`);
                });
            });
        });
    </script>
    <script>
        function confirmDelete(offerId) {
            var confirmDelete = confirm("Are you sure you want to delete the offer?");

            if (confirmDelete) {
                // If user confirms, you can proceed with deletion
                window.location.href = "delete_offer.php?id=" + offerId; // Redirect to delete_offer.php with offerId as parameter
            } else {
                // If user cancels, do nothing
            }
        }
    </script>
    <script src="../assets/script/script.js"></script>
    <script src="j-query.js"></script>
    <script src="https://flowbite-admin-dashboard.vercel.app//app.bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
</body>

</html>