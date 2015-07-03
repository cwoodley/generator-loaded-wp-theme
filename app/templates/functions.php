<?php
/**
 * WA Youth Awards functions and definitions
 *
 * @package <%= themeslug %>
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( '<%= themeslug %>_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function <%= themeslug %>_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on WA Youth Awards, use a find and replace
	 * to change '<%= themeslug %>' to the name of your theme in all the template files
	 */
	load_theme_textdomain( '<%= themeslug %>', get_template_directory() . '/languages' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', '<%= themeslug %>' ),
	) );
	
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

}
endif; // <%= themeslug %>_setup
add_action( 'after_setup_theme', '<%= themeslug %>_setup' );


/**
 * Enqueue scripts and styles.
 */
/**
 * Enqueue scripts and styles.
 */
function <%= themeslug %>_scripts() {
	wp_enqueue_style( '<%= themeslug %>-style', get_stylesheet_directory_uri() . '/assets/stylesheets/css/<%= themeslug %>.css', false, '20140908' );
	wp_enqueue_script( 'presentation', get_stylesheet_directory_uri() . '/assets/javascripts/presentation.js', array('jquery'));
}
add_action( 'wp_enqueue_scripts', '<%= themeslug %>_scripts' );
 
?>