import setproctitle
import catppuccin
setproctitle.setproctitle("qutebrowser")

c.aliases = {
    "w": "session-save",
    "wq": "quit --save",
}
config.load_autoconfig(False)

c.tabs.position = 'bottom'


# Config Defaults
c.auto_save.session = True
c.auto_save.interval = 15000
c.backend = 'webengine'

catppuccin.setup(c, 'mocha', True)

c.colors.downloads.system.bg = 'rgb'
c.colors.downloads.system.fg = 'rgb'
c.colors.webpage.darkmode.enabled = True
c.completion.height = "20%"
c.completion.quick = False
c.completion.shrink = False
c.completion.show = "auto"
c.confirm_quit = ["downloads"]
c.content.autoplay = True
c.content.blocking.adblock.lists = ['https://easylist.to/easylist/easylist.txt', 'https://easylist.to/easylist/easyprivacy.txt']
c.content.blocking.enabled = True
c.content.blocking.hosts.block_subdomains = True
c.content.cache.appcache = True
c.content.cache.maximum_pages = 0
c.content.cache.size = None
c.content.canvas_reading = True
c.content.cookies.accept = 'all'
c.content.cookies.store = True
c.content.default_encoding = 'utf-8'
c.content.blocking.method = 'auto'
c.content.desktop_capture = 'ask'
c.content.dns_prefetch = True
c.content.frame_flattening = False
c.content.fullscreen.overlay_timeout = 3000
c.content.fullscreen.window = True
c.content.geolocation = 'ask'
c.content.headers.accept_language = "en-US,en;q=0.8,fi;q=0.6"
c.content.headers.do_not_track = True
c.content.headers.referer = 'same-domain'
c.content.headers.user_agent = 'Mozilla/5.0 ({os_info}) AppleWebKit/{webkit_version} (KHTML, like Gecko) {qt_key}/{qt_version} {upstream_browser_key}/{upstream_browser_version} Safari/{webkit_version}'
c.content.hyperlink_auditing = False
c.content.images = True
# c.content.javascript.alert = True
# c.content.javascript.can_access_clipboard = False
# c.content.javascript.can_close_tabs = False
# c.content.javascript.can_open_tabs_automatically = False
# c.content.javascript.enabled = True
# c.content.javascript.log = {'unknown': 'debug', 'info': 'debug', 'warning': 'debug', 'error': 'debug'}
# c.content.javascript.modal_dialog = False
# c.content.javascript.prompt = True
c.content.local_content_can_access_file_urls = True
c.content.local_content_can_access_remote_urls = False
c.content.local_storage = True
c.content.media.audio_capture = 'ask'
c.content.media.audio_video_capture = 'ask'
c.content.media.video_capture = 'ask'
c.content.mouse_lock = 'ask'
c.content.mute = False
c.content.notifications.enabled = 'ask'
c.content.notifications.presenter = 'auto'
c.content.notifications.show_origin = True
c.content.pdfjs = False
c.content.persistent_storage = 'ask'
c.content.plugins = False
c.content.prefers_reduced_motion = False
c.content.print_element_backgrounds = True
c.content.private_browsing = False
c.content.webgl = True
c.content.webrtc_ip_handling_policy = 'all-interfaces'
c.downloads.location.directory = "$HOME/Downloads"
c.downloads.location.suggestion = 'path'
c.downloads.location.prompt = False
c.downloads.position = 'bottom'
c.editor.command = ["alacritty", "-e", "vim '{}'"]
c.editor.encoding = 'utf-8'
c.editor.remove_file = True
c.fileselect.folder.command = ['alacritty', '-e', 'vifmrun', '{}']
c.fonts.default_family      = ['Ubuntu Nerd Font']
c.fonts.default_size        = '14px'
c.fonts.completion.category = 'bold default_size default_family'
c.fonts.completion.entry    = 'default_size default_family'
c.fonts.debug_console       = 'default_size default_family'
c.fonts.downloads           = 'default_size default_family'
c.fonts.keyhint             = 'default_size default_family'
c.fonts.messages.error      = 'default_size default_family'
c.fonts.messages.info       = 'default_size default_family'
c.fonts.messages.warning    = 'default_size default_family'
c.fonts.prompts             = 'default_size default_family'
c.fonts.statusbar           = 'default_size default_family'
c.fonts.hints               = "bold 16px 'Ubuntu Nerd Font'"
c.hints.chars = "bighutscanly"
c.input.insert_mode.auto_leave = True
c.input.insert_mode.auto_load = True
c.scrolling.bar = 'never'
c.scrolling.smooth = True
c.tabs.background = True
c.tabs.last_close = "close"
c.tabs.select_on_remove = "prev"
c.tabs.padding = {
    "left": 8,
    "right": 8,
    "top": 3,
    "bottom": 3,
}
c.url.default_page = "https://www.youtube.com/"
c.url.searchengines = {"DEFAULT": "https://search.brave.com/search?q={}"}
c.url.start_pages = "https://jasminespetcare.org/"
c.tabs.title.format = '{index}{private}{title_sep}{current_title}'
