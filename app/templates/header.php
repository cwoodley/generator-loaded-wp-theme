<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package <%= themeslug %>
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/vendor/html5shiv.min.js"></script>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>

	<!--<button class="menu-toggle"><?php _e( 'Primary Menu', '<%= themeslug %>' ); ?></button>-->
	<a id="menu-toggle" href="#">Menu <i class="fa fa-bars" ></i></a>
	<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
