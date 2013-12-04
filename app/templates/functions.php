<?
	function roots_head_cleanup() {
	  // Originally from http://wpengineer.com/1438/wordpress-header/
	
		remove_action('wp_head', 'feed_links', 2);
		remove_action('wp_head', 'feed_links_extra', 3);
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
		remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
	
	
	}
	add_filter('the_generator', '__return_false');
	
	function my_theme_add_editor_styles() {
	    add_editor_style( 'loaded-editor.css' );
	}
	add_action( 'init', 'my_theme_add_editor_styles' );
	
	register_nav_menu( 'primary', __( 'Navigation Menu', 'html5reset' ) );
	
	
	function roots_body_class($classes) {
	  // Add post/page slug
	  if (is_single() || is_page() && !is_front_page()) {
	    $classes[] = basename(get_permalink());
	  }
	
	  // Remove unnecessary classes
	  $home_id_class = 'page-id-' . get_option('page_on_front');
	  $remove_classes = array(
	    'page-template-default',
	    $home_id_class
	  );
	  $classes = array_diff($classes, $remove_classes);
	
	  return $classes;
	}
	add_filter('body_class', 'roots_body_class');
	
	// enqueue_scripts
	function enqueue_scripts() {  
	    if (!is_admin()) {  
	        wp_deregister_script('jquery');
		    wp_deregister_script('jquery-ui-core');
		    wp_deregister_script('jquery-ui-tabs');
		    wp_deregister_script('jquery-ui-sortable');
		    wp_deregister_script('jquery-ui-draggable');
		    wp_deregister_script('jquery-ui-droppable');
		    wp_deregister_script('jquery-ui-selectable');
		    wp_deregister_script('jquery-ui-resizable');
		    wp_deregister_script('jquery-ui-dialog');	
		    
	        wp_enqueue_script('jquery', get_stylesheet_directory_uri() . '/assets/vendor/jquery.min.js', array(), null, false );
	        wp_enqueue_script('jquery_ui', get_stylesheet_directory_uri() . '/assets/vendor/jquery-ui.min.js', array('jquery'), null, false);
	        wp_enqueue_script('modernizr', get_stylesheet_directory_uri() . '/assets/vendor/modernizr.js', array(), null, false ); 
	        
	    }  
	}  
	add_action('init', 'enqueue_scripts'); 
	
	// show admin bar only for admins
	if (!current_user_can('manage_options')) {
		add_filter('show_admin_bar', '__return_false');
	}

	// EMAIL ENCODE SHORTCODE
	function email_encode_function( $atts, $content ){
		return '<a href="'.antispambot("mailto:".$content).'">'.antispambot($content).'</a>';
	}
	add_shortcode( 'email', 'email_encode_function' );
?>